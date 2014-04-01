describe("SPS Publish", function() {

   describe("Given single SPS instance", function() {
      var sps;
      var testSigName = "TEST_SIGNAL";
      var mockEventDataArray = [37, "", true, undefined, {a:1}];
      var mockEventData = randomChoice(mockEventDataArray);
      var numberOfPublishedMessages = Math.floor(1 + 20 * Math.random());
      var numberOfSubscribers = Math.floor(1 + 200 * Math.random());

      beforeEach(function() {
         mockHandler = jasmine.createSpy('mockHandler');
         sps = new SPS_Manager();
         sps.subscribe(testSigName, mockHandler);
      });

      describe("AND Given " + testSigName + " is subscribed too" , function() {
         it("when " + testSigName + " is published with event data then the " +
            " signal handler should receive the event with the same data", function() {
            sps.publish(testSigName, mockEventData);
            expect(mockHandler).toHaveBeenCalledWith(mockEventData);
         });

         it("when " + testSigName + " is published " + numberOfPublishedMessages + 
            " times then should received " + numberOfPublishedMessages + " times", function() {
            for (var i = 0; i < numberOfPublishedMessages; i++) {
               sps.publish(testSigName);
            }
            expect(mockHandler.calls.count()).toEqual(numberOfPublishedMessages);
         });
      });

      describe("AND Given " + testSigName + " is subscribed too by " +
               numberOfSubscribers + " handlers", function() {
         it("when " + testSigName + " is published then the " + testSigName + 
            " event should be received by all " + numberOfSubscribers + " handlers", function() {
            mockHandlerArray = []
            for (var i = 0; i < 20; i++) {
               var tmp = jasmine.createSpy('mockHandler' + i);
               mockHandlerArray.push(tmp);
               sps.subscribe(testSigName, tmp);
            }
 
            sps.publish(testSigName, mockEventData);
            for (var i = 0; i < 20; i++) {
               expect(mockHandlerArray[i]).toHaveBeenCalledWith(mockEventData);
            }
         });
      });
   });
});
