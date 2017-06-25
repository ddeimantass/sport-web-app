<?php

class Sport_model extends CI_Model {
    
    public function get_matches() {
        $timesLeft = 10;
        do{
            $json = @file_get_contents("http://213.190.51.198/test-services/scheduleAndResults.php");
            $timesLeft--;
        }while(!$json && $timesLeft > 0);
        if($json)
            $data = json_decode($json, true);
        else
            $data = null;
        
		return $data;
	}
    public function get_teams( $eachTeamId ) {
        $teams = array();
        foreach($eachTeamId as $id){
            $timesLeft = 10;
            do{
                $json = @file_get_contents("http://213.190.51.198/test-services/team.php?id={$id}");
                $timesLeft--;
            }while(!$json && $timesLeft > 0);
            if($json){
                $data = json_decode($json, true);
                $teams[$id] = $data["name"];
            }
            else
                return null;
            
        }
		return $teams;
	}
    
}