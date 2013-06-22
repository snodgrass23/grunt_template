/**
 @url: https://github.com/jcarver989/phantom-jasmine
 @license: Apache 2

 Jasmine Reporter that outputs test results to the browser console. 
 Useful for running in a headless environment such as PhantomJs, ZombieJs etc.

 Usage:
 // From your html file that loads jasmine:    
 jasmine.getEnv().addReporter(new jasmine.ConsoleReporter());
 jasmine.getEnv().execute();
*/

(function(jasmine, console) {
  if (!jasmine) {
    throw "jasmine library isn't loaded!";
  }

  var ANSI = {}
  ANSI.color_map = {
      "black" : 30,
      "red"   : 31,
      "green" : 32,
      "yellow": 33,
      "blue"  : 34,
      "purple": 35,
      "aqua"  : 36
  }

  ANSI.colorize_text = function(text, color) {
    var color_code = this.color_map[color];
    return "\033[" + color_code + "m" + text + "\033[0m";
  }
  
  var ConsoleReporter = function() {
    if (!console || !console.log) { throw "console isn't present!"; }
    this.status = this.statuses.stopped;
  };

  var proto = ConsoleReporter.prototype;
  proto.statuses = {
    stopped : "stopped",
    running : "running",
    fail    : "fail",
    success : "success"
  };

  proto.reportRunnerStarting = function(runner) {
    this.status = this.statuses.running;
    this.start_time = (new Date()).getTime();
    this.executed_specs = 0;
    this.passed_specs = 0;
    this.executed_tests = 0;
    this.passed_tests = 0;
    this.log("Starting...");
  };

  proto.reportRunnerResults = function(runner) {
    var failed = this.executed_specs - this.passed_specs;
    var spec_str = this.executed_specs + (this.executed_specs === 1 ? " spec, " : " specs, ");
    var fail_str = failed + (failed === 1 ? " failure in " : " failures in ");
    var tests_str = this.executed_tests + (this.executed_tests === 1 ? " test, " : " tests, ");
    var tests_fail_str = this.executed_tests - this.passed_tests;
    var color = (failed > 0)? "red" : "green";
    var dur = (new Date()).getTime() - this.start_time;

    this.log("\nFinished");
    this.log("-----------------");
    this.log(spec_str + fail_str + (dur/1000) + "s.", color);
    this.log(tests_str + tests_fail_str + ".", color);

    this.status = (failed > 0)? this.statuses.fail : this.statuses.success;

    /* Print something that signals that testing is over so that headless browsers
       like PhantomJs know when to terminate. */
    this.log("");
    this.log("ConsoleReporter finished");
  };


  proto.reportSpecStarting = function(spec) {
    this.executed_specs++;
  };

  proto.reportSpecResults = function(spec) {
    if (spec.results().passed()) {
      this.passed_specs++;
      return;
    }

    var resultText = spec.suite.description + " : " + spec.description;
    this.log(resultText, "red");

    var items = spec.results().getItems()
    for (var i = 0; i < items.length; i++) {
      var trace = items[i].trace.stack || items[i].trace;
      this.log(trace, "red");
    }
  };

  var temp = []
  proto.reportSuiteResults = function(suite) {
    var self = this;
    var results = suite.results();
    var failed = results.totalCount - results.passedCount;
    var color = (failed > 0)? "red" : "green";
    temp.push({ message: suite.description + ": " + results.passedCount + " of " + results.totalCount + " passed.", color: color })

    if (!suite.parentSuite) {
      this.log('\n' + suite.description);
      temp.forEach(function(spec, i) {
        if (i === temp.length-1) {
          spec.message = spec.message.replace(/^[\w|\-\s]+:\s/g, '')
          spec.color = 'aqua'
        }
        self.log(spec.message, spec.color);
      })
      temp.length = 0;
    }
  };

  proto.log = function(str, color) {
    var text = (color != undefined)? ANSI.colorize_text(str, color) : str;
    console.log(text)
  };

  jasmine.ConsoleReporter = ConsoleReporter;
})(jasmine, console);


