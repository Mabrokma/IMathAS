<?php
/*
 * IMathAS: Gradebook - Get initial assessment data for a student
 * (c) 2019 David Lippman
 *
 * Method: GET
 * Query string parameters:
 *  aid   Assessment ID
 *  cid   Course ID
 *  uid   Student's User ID
 *
 * Returns: assessInfo object
 */

$init_skip_csrfp = true; // TODO: get CSRFP to work
$no_session_handler = 'json_error';
require_once("../init.php");
require_once("./common_start.php");
require_once("./AssessInfo.php");
require_once("./AssessRecord.php");
require_once('./AssessUtils.php');

header('Content-Type: application/json; charset=utf-8');

if (!$isActualTeacher && !$istutor) {
  echo '{"error": "no_access"}';
  exit;
}
//validate inputs
check_for_required('GET', array('aid', 'cid', 'uid'));
$cid = Sanitize::onlyInt($_GET['cid']);
$aid = Sanitize::onlyInt($_GET['aid']);
$uid = Sanitize::onlyInt($_GET['uid']);

//load settings without questions
$assess_info = new AssessInfo($DBH, $aid, $cid, false);
if ($istutor) {
  $tutoredit = $assess_info->getSetting('tutoredit');
  if ($tutoredit == 2) { // no Access
    echo '{"error": "no_access"}';
    exit;
  }
}
// load question settings and code
$assess_info->loadQuestionSettings('all', true);

// get user info
$query = 'SELECT iu.FirstName, iu.LastName, istu.latepass, istu.timelimitmult ';
$query .= 'FROM imas_users AS iu JOIN imas_students AS istu ON istu.userid=iu.id ';
$query .= 'WHERE iu.id=? AND istu.courseid=?';
$stm = $DBH->prepare($query);
$stm->execute(array($uid, $cid));
$studata = $stm->fetch(PDO::FETCH_ASSOC);
if ($studata === false) {
  echo '{"error": "invalid_uid"}';
  exit;
}

$assess_info->loadException($uid, $isstudent, $studata['latepass'], $latepasshrs, $courseenddate);
$assess_info->applyTimelimitMultiplier($studata['timelimitmult']);

//load user's assessment record - start with scored data
$assess_record = new AssessRecord($DBH, $assess_info, false);
$assess_record->loadRecord($uid);
if (!$assess_record->hasRecord()) {
  echo '{"error": "invalid_record"}';
  exit;
}

//fields to extract from assess info for inclusion in output
$include_from_assess_info = array(
  'name', 'submitby', 'enddate', 'can_use_latepass', 'hasexception',
  'original_enddate', 'extended_with', 'latepasses_avail', 'points_possible',
  'latepass_extendto', 'allowed_attempts', 'keepscore', 'timelimit', 'ver'
);
$assessInfoOut = $assess_info->extractSettings($include_from_assess_info);

// indicate whether teacher/tutor can edit scores or not
if ($istutor && $tutoredit == 0) {
  $assessInfoOut['can_edit_scores'] = false;
} else {
  $assessInfoOut['can_edit_scores'] = true;
}

if (isset($CFG['GEN']['sendquestionproblemsthroughcourse'])) {
  $assessInfoOut['qerror_cid'] = $CFG['GEN']['sendquestionproblemsthroughcourse'];
}

// get student's assessment attempt metadata
$assessInfoOut = array_merge($assessInfoOut, $assess_record->getGbAssessMeta());

//get attempt info
$assessInfoOut['has_active_attempt'] = $assess_record->hasActiveAttempt();
//get time limit expiration of current attempt, if appropriate
if ($assessInfoOut['has_active_attempt'] && $assessInfoOut['timelimit'] > 0) {
  $assessInfoOut['timelimit_expires'] = $assess_record->getTimeLimitExpires();
}

// if not available, see if there is an unsubmitted scored attempt
if ($assessInfoOut['available'] !== 'yes') {
  $assessInfoOut['has_unsubmitted_scored'] = $assess_record->hasUnsubmittedScored();
}

$assessInfoOut['userfullname'] = $studata['LastName'].', '.$studata['FirstName'];

// get records of all previous attempts, as well as HTML for the scored versions
$assessInfoOut['assess_versions'] = $assess_record->getGbAssessData();
$assessInfoOut['has_practice'] = ($assess_record->getStatus()&16)>0;
if ($assessInfoOut['has_practice']) {
  $assessInfoOut['assess_versions'][] = array(
    'status' => 3
  );
}

//output JSON object
echo json_encode($assessInfoOut);