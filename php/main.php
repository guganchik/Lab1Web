<?php


$x = $_GET["x"];
$y = $_GET["y"];
$r = $_GET["r"];
$time_offset = $_GET["time"];
$timestart = microtime(true);

function validating($x, $y, $r){
  return valid_x($x) && valid_y($y) && valid_r($r);
}

function valid_x($x){
  $round_x = substr($x, 0, 3);
  return ($round_x > -5 && $round_x < 3);
}

function valid_y($y){
  return ($y == -5 || $y == -4 || $y == -3 || $y == -2 || $y == -1 || $y == 0 || $y == 1 || $y == 2 || $y == 3);
}

function valid_r($r){
  return ($r == 1 || $r == 1.5 || $r == 2 || $r == 2.5 || $r == 3);
}


function calculation($x, $y, $r) {
    if ($x < 0 && $y > 0) {
        $current_val = sqrt($x*$x + $y*$y);
        return $current_val <= $r/4;
    }

    if ($x > 0 && $y > 0) {
        return ($x <= $r/2 && $y <= $r);
    }

    if ($x > 0 && $y < 0) {
        $current_val = $x - $r;
        return $y >= $current_val;
    }

    if ($y == 0) {
        return ($x >= -$r/2 && $x <= $r);
    }

    if ($x == 0) {
        return ($y >= -$r && $y <= $r);
    }
    else {return false;}
}

if (validating($x, $y, $r)) {

    $answer = [];
    if (calculation($x, $y, $r)) {
        $result = "Hit";
    } else {
        $result = "Miss";
        }

        $worktime = microtime(true) - $timestart;
        $current_time = gmdate('H:i:s', time() - $time_offset * 60);

        if ($time_offset > 0) {
            $timezone_info = " (GMT " . $time_offset / -60 . ")";
        } else {
            $timezone_info = " (GMT +" . $time_offset / -60 . ")";
        }
        $tr = [$x, $y, $r, $result, number_format($worktime, 10, ".", "") . " s", $current_time . $timezone_info];
        array_push($answer, $tr);
    print_r(json_encode($answer));

} else {

    http_response_code(400);

    if (!valid_x($x)) {
        echo "X is invalid value.\n";
    }
    if (!valid_y($y)) {
        echo "Y is invalid value.\n";
    }
    if (!valid_r($r)) {
        echo "R is invalid value.\n";
    }
}
?>
