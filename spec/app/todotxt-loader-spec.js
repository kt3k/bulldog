describe("todoTxt", function () {
  var tasksLines, request;

  describe(".load", function () {
    beforeEach(function () {
      todoTxt.load(function (tasksResponse) {
        tasksLines = tasksResponse;
      });
      request = mostRecentAjaxRequest();
    });

    it("should request the local todo.txt file", function () {
      expect(request.url).toEqual('todo.txt');
    });

    describe("onSuccess", function () {
      beforeEach(function () {
        request.response(testResponses.localTodos);
      });

      it("should send the file split into task lines", function () {
        expect(tasksLines.length).toEqual(7);
      });
    });
  });

  describe(".buildTasks", function () {
    var tasks;

    beforeEach(function () {
      todoTxt.buildTasks(function (taskModels) {
        tasks = taskModels;
      });
      request = mostRecentAjaxRequest();
      request.response(testResponses.localTodos);
    });

    it("should call the onSuccess with an array of Task models", function () {
      expect(tasks.length).toEqual(7);
      expect(tasks[0].get('description')).toEqual('Call Mom for her birthday');
    });

    it("should set the project correctly on a Task", function () {
      expect(tasks[2].get('project')).toEqual('Vacation');
      expect(tasks[4].get('project')).toEqual('CleanDesk');
    });

    it("should set the context correctly on a Task", function () {
      expect(tasks[2].get('context')).toEqual('pc');
      expect(tasks[4].get('context')).toEqual('home');
      expect(tasks[5].get('context')).toEqual('work');
    });

    it("should strip the project from the description", function () {
      expect(tasks[2].get('description')).not.toMatch(/\+Vacation/);
    });

    it("should strip the context from the description", function () {
      expect(tasks[2].get('description')).not.toMatch(/@pc/);
    });

    it("should clean up extra whitespace from task descriptions", function () {
      expect(tasks[2].get('description')).toEqual('Google Maui restaurant reviews');
    });

    it("should set the task number", function () {
      expect(tasks[2].get('number')).toEqual(3);
    });

  });
});
