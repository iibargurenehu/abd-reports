$(document).ready(function(){
    console.log("jQuery loaded");
    horaActual = new Date().getTime();

    $.get($.urlParam('group')+"-latest.json", function(data){
        console.log("Group load success");
        console.log(data);
   
        $("#lastUpdate").html(new Date(data.reportTime).toString());
        $("#lastCommitMain").html("(hace "+timeBetween(horaActual,data.lastBranchCommits.main.date)+") "+data.lastBranchCommits.main.hash);
        $("#lastCommitDevelop").html("(hace "+timeBetween(horaActual,data.lastBranchCommits.develop.date)+") "+data.lastBranchCommits.develop.hash);

        branchNames = Array.from(Object.keys(data.lastBranchCommits));
        branchNames.splice(branchNames.indexOf("main"),1);
        branchNames.splice(branchNames.indexOf("develop"),1);
        branchNames.sort();
        console.log(branchNames);
        $(branchNames).each(function(index, element){
            $("#other-commit-timestamps").html($("#other-commit-timestamps").html()+'<div class="reportSubItem"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+element+': ('+timeBetween(horaActual,data.lastBranchCommits[element].date)+') '+data.lastBranchCommits[element].hash+'</div')
        });

        $("#mainCompiles").html(data.mainCompiles ? "SÍ" : "NO");
        $("#developCompiles").html(data.developCompiles ? "SÍ" : "NO");

        $("#mainPassesGroupTests").html(data.mainPassesWhiteboxTests ? "SÍ" : "NO");
        $("#developPassesGroupTests").html(data.developPassesWhiteboxTests ? "SÍ" : "NO");

        $("#mainCoverage").html(data.mainPassesWhiteboxTests ? data.mainCoverage : "N/D");
        $("#developCoverage").html(data.developPassesWhiteboxTests ? data.developCoverage : "N/D");
    
        $("#mainClassMethodTests").html('{0}%'.format(Number(data.percentagePassedBySuiteMain.ClassMethodTests*100).toFixed(0)));
        $("#developClassMethodTests").html('{0}%'.format(Number(data.percentagePassedBySuiteDevelop.ClassMethodTests*100).toFixed(0)));

        $("#countFailDevelopClassMethodTests").html(data.testsFailedDevelop.ClassMethodTests.length);
        $(data.testsFailedDevelop.ClassMethodTests).each(function(i,test){
            $("#developFailedClassMethodTests").html($("#developFailedClassMethodTests").html()+`<div class="reportSubItem"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${test}</div>`);
        })

        console.log(JSON.stringify(Array.from(Object.keys(data.testPassedBranches.ClassMethodTests))));
        $(Array.from(Object.keys(data.testPassedBranches.ClassMethodTests))).each(function(i,branchName){
            if(data.testPassedBranches.ClassMethodTests[branchName].length > 0){
                $("#branchesPassedClassMethodTests").html($("#branchesPassedClassMethodTests").html()+`<div class="reportSubItem"> &nbsp;&nbsp;&nbsp;${branchName}</div>`);
                $(data.testPassedBranches.ClassMethodTests[branchName]).each(function(j,testName){
                    $("#branchesPassedClassMethodTests").html($("#branchesPassedClassMethodTests").html()+`<div class="reportSubItem"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${testName}</div>`);
                });
            }
        });



       
        $("#mainMiniSQLTests").html('{0}%'.format(Number(data.percentagePassedBySuiteMain.MiniSQLTests*100).toFixed(0)));
        $("#developMiniSQLTests").html('{0}%'.format(Number(data.percentagePassedBySuiteDevelop.MiniSQLTests*100).toFixed(0)));

        $("#countFailDevelopMiniSQLTests").html(data.testsFailedDevelop.MiniSQLTests.length);
        $(data.testsFailedDevelop.MiniSQLTests).each(function(i,test){
            $("#developFailedMiniSQLTests").html($("#developFailedMiniSQLTests").html()+`<div class="reportSubItem"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${test}</div>`);
        })

        console.log(JSON.stringify(Array.from(Object.keys(data.testPassedBranches.MiniSQLTests))));
        $(Array.from(Object.keys(data.testPassedBranches.MiniSQLTests))).each(function(i,branchName){
            if(data.testPassedBranches.MiniSQLTests[branchName].length > 0){
                $("#branchesPassedMiniSQLTests").html($("#branchesPassedMiniSQLTests").html()+`<div class="reportSubItem"> &nbsp;&nbsp;&nbsp;${branchName}</div>`);
                $(data.testPassedBranches.MiniSQLTests[branchName]).each(function(j,testName){
                    $("#branchesPassedMiniSQLTests").html($("#branchesPassedMiniSQLTests").html()+`<div class="reportSubItem"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${testName}</div>`);
                });
            }
        });
        


        $("#mainParsingTests").html('{0}%'.format(Number(data.percentagePassedBySuiteMain.ParsingTests*100).toFixed(0)));
        $("#developParsingTests").html('{0}%'.format(Number(data.percentagePassedBySuiteDevelop.ParsingTests*100).toFixed(0)));

        $("#countFailDevelopParsingTests").html(data.testsFailedDevelop.ParsingTests.length);
        $(data.testsFailedDevelop.ParsingTests).each(function(i,test){
            $("#developFailedParsingTests").html($("#developFailedParsingTests").html()+`<div class="reportSubItem"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${test}</div>`);
        })

        console.log(JSON.stringify(Array.from(Object.keys(data.testPassedBranches.ParsingTests))));
        $(Array.from(Object.keys(data.testPassedBranches.ParsingTests))).each(function(i,branchName){
            if(data.testPassedBranches.ParsingTests[branchName].length > 0){
                $("#branchesPassedParsingTests").html($("#branchesPassedParsingTests").html()+`<div class="reportSubItem"> &nbsp;&nbsp;&nbsp;${branchName}</div>`);
                $(data.testPassedBranches.ParsingTests[branchName]).each(function(j,testName){
                    $("#branchesPassedParsingTests").html($("#branchesPassedParsingTests").html()+`<div class="reportSubItem"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${testName}</div>`);
                });
            }
        });



        $("#mainSecurityTests").html('{0}%'.format(Number(data.percentagePassedBySuiteMain.SecurityTests*100).toFixed(0)));
        $("#developSecurityTests").html('{0}%'.format(Number(data.percentagePassedBySuiteDevelop.SecurityTests*100).toFixed(0)));

        $("#countFailDevelopSecurityTests").html(data.testsFailedDevelop.SecurityTests.length);
        $(data.testsFailedDevelop.SecurityTests).each(function(i,test){
            $("#developFailedSecurityTests").html($("#developFailedSecurityTests").html()+`<div class="reportSubItem"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${test}</div>`);
        })

        console.log(JSON.stringify(Array.from(Object.keys(data.testPassedBranches.SecurityTests))));
        $(Array.from(Object.keys(data.testPassedBranches.SecurityTests))).each(function(i,branchName){
            if(data.testPassedBranches.SecurityTests[branchName].length > 0){
                $("#branchesPassedSecurityTests").html($("#branchesPassedSecurityTests").html()+`<div class="reportSubItem"> &nbsp;&nbsp;&nbsp;${branchName}</div>`);
                $(data.testPassedBranches.SecurityTests[branchName]).each(function(j,testName){
                    $("#branchesPassedSecurityTests").html($("#branchesPassedSecurityTests").html()+`<div class="reportSubItem"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${testName}</div>`);
                });
            }
        });




        $("#mainSecurityMiniSQLTests").html('{0}%'.format(Number(data.percentagePassedBySuiteMain.SecurityMiniSQLTests*100).toFixed(0)));
        $("#developSecurityMiniSQLTests").html('{0}%'.format(Number(data.percentagePassedBySuiteDevelop.SecurityMiniSQLTests*100).toFixed(0)));

        $("#countFailDevelopSecurityMiniSQLTests").html(data.testsFailedDevelop.SecurityMiniSQLTests.length);
        $(data.testsFailedDevelop.SecurityMiniSQLTests).each(function(i,test){
            $("#developFailedSecurityMiniSQLTests").html($("#developFailedSecurityMiniSQLTests").html()+`<div class="reportSubItem"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${test}</div>`);
        })

        console.log(JSON.stringify(Array.from(Object.keys(data.testPassedBranches.SecurityMiniSQLTests))));
        $(Array.from(Object.keys(data.testPassedBranches.SecurityMiniSQLTests))).each(function(i,branchName){
            if(data.testPassedBranches.SecurityMiniSQLTests[branchName].length > 0){
                $("#branchesPassedSecurityMiniSQLTests").html($("#branchesPassedSecurityMiniSQLTests").html()+`<div class="reportSubItem"> &nbsp;&nbsp;&nbsp;${branchName}</div>`);
                $(data.testPassedBranches.SecurityMiniSQLTests[branchName]).each(function(j,testName){
                    $("#branchesPassedSecurityMiniSQLTests").html($("#branchesPassedSecurityMiniSQLTests").html()+`<div class="reportSubItem"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${testName}</div>`);
                });
            }
        });


    }).fail(function(){
        alert("Grupo '"+$.urlParam('group')+"' no encoentrado")
    });
});

String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{([0-9]+)}/g, function (match, index) {
      return typeof args[index] == 'undefined' ? match : args[index];
    });
  };

$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)')
                      .exec(window.location.search);

    return (results !== null) ? results[1] || 0 : false;
}

function timeBetween(now, then){
    secs = (now - then) / 1000;

    if(secs < 60){
        return Math.round(secs)+" segundos";
    }
    else if(secs < 60*60){
        return Math.round(secs/(60))+" minutos";
    }
    else if(secs < 24*60*60){
        return Math.round(secs/(60*60))+" horas";
    }
    else{
        return Math.round(secs/(24*60*60))+" días";
    }    
}

function toggle_visibility(id){var e = document.getElementById(id); if ( e.style.display == 'block' ) e.style.display = 'none'; else e.style.display = 'block'; }
