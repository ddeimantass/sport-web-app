<?php if(!isset($error)):?>
<article class="container" id="list">
    <div class="row">
        <div class="panel panel-default col-xs-7">
            <div class="panel-body row">
                <div class="page-header col-xs-12">
                    <h1>Matches</h1>
                </div>
                <table id="matches">
                    <thead>
                        <th id="date" class="asc">Date <i class="fa fa-sort-amount-asc" aria-hidden="true"></i><i class="fa fa-sort-amount-desc" aria-hidden="true"></i></th>
                        <th id="teamA">Team A <i class="fa fa-sort-amount-asc" aria-hidden="true"></i><i class="fa fa-sort-amount-desc" aria-hidden="true"></i></th>
                        <th id="teamB">Team B <i class="fa fa-sort-amount-asc" aria-hidden="true"></i><i class="fa fa-sort-amount-desc" aria-hidden="true"></i></th>
                        <th id="score">Score <i class="fa fa-sort-amount-asc" aria-hidden="true"></i><i class="fa fa-sort-amount-desc" aria-hidden="true"></i></th>
                    </thead>
                    <tbody>
                        <?php 
                            foreach($matches as $match){
                                echo 
                                    "<tr>
                                        <td>{$match['date']}</td>
                                        <td>{$teams[$match['teamAId']]}</td>
                                        <td>{$teams[$match['teamBId']]}</td>
                                        <td>{$score[$match['id']]}</td>
                                    </tr>";
                            }
                        ?>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="panel panel-default col-xs-5">
            <div class="panel-body row">
                <div class="page-header col-xs-12">
                    <h1>Teams</h1>
                </div>
                <table id="teams">
                    <thead>
                        <th>Name</th>
                        <th>Wins</th>
                    </thead>
                    <tbody>
                        <?php 
                            foreach($wins as $teamId => $teamWins){
                                echo 
                                    "<tr>
                                        <td>{$teams[($teamId)]}</td>
                                        <td>{$teamWins}</td>
                                    </tr>";
                            }
                        ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</article>
<?php else: 
    echo "<div class='container'><h1 class='alert alert-danger'>{$error}</h1><div>";
endif;?>