<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Site extends CI_Controller {
    
    public function index() {
        $this->pagrindinis();
	}
    public function pagrindinis() {
        $errorMessage = "Sorry, data at the moment are not available, please try to refresh the page.";
        $eachTeamId = array();
        $matches = $this->sport_model->get_matches();
        if($matches){
            foreach($matches as $match){
                if(is_numeric( $match["teamAId"] ) && !in_array($match["teamAId"], $eachTeamId) )
                    $eachTeamId[] = $match["teamAId"];
                if(is_numeric( $match["teamBId"] ) && !in_array($match["teamBId"], $eachTeamId))
                    $eachTeamId[] = $match["teamBId"];
                if(!isset($match["scoreA"], $match["scoreB"]))
                    $score[$match["id"]] = '';
                else
                    $score[$match["id"]] = "{$match["scoreA"]}:{$match["scoreB"]}";
            }
            if(!empty($eachTeamId)){
                $teams = $this->sport_model->get_teams($eachTeamId);
                if($teams){
                    $wins = $this->teams_by_wins($teams, $matches);
                    arsort($wins);
                }
            }
            if($teams){
                $data = array(
                    'matches' => $matches,
                    'score' => $score,
                    'teams' => $teams,
                    'wins' => $wins,
                );
            }
            else{
                $data = array('error' => $errorMessage);
            }
        }
        else{
            $data = array('error' => $errorMessage);
        }
        $this->load->view("header");
        $this->load->view("pagrindinis", $data);
        $this->load->view("footer");        
	}
    
    private function teams_by_wins($teams, $matches){
        foreach(array_keys($teams) as $id){
            $wins[$id] = 0;
        }
        foreach($matches as $match ){
            if(isset($match["scoreA"], $match["scoreB"])){
                
                if($match["scoreA"] > $match["scoreB"])
                    $wins[$match["teamAId"]]++;
                else
                    $wins[$match["teamBId"]]++;
            } 
            
        }
        return $wins;
    }
} 