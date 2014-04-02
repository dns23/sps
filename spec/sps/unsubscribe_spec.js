describe("SPS Unsubscribe", function() {

   describe("Given single SPS instance", function() {
      var sps;
      var testSigName = "TEST_SIGNAL";
      var mockEventDataArray = [37, "", true, undefined, {a:1}];
      var mockEventData = randomChoice(mockEventDataArray);
      var numberOfSubscribers = Math.floor(1 + 200 * Math.random());
      var numberOfUnsubscribers = Math.floor(numberOfSubscribers * Math.random());

      beforeEach(function() {
         mockHandler = jasmine.createSpy('mockHandler');
         sps = new SPS_Manager();
         sps.subscribe(testSigName, mockHandler);
      });

      describe("AND Given " + testSigName + " was subscribed too by " +
               numberOfSubscribers + " handlers", function() {
         it("when " + numberOfUnsubscribers + " handlers unsubscribe AND " + 
            testSigName + " is published then the " + testSigName + 
            " event should be received by " + 
            (numberOfSubscribers - numberOfUnsubscribers) + " handlers", function() {

            mockHandlerArray = []
            GivenNMockSubsciber(sps, mockHandlerArray, numberOfSubscribers); 

            sps.publish(testSigName, mockEventData);
            for (var i = 0; i < numberOfSubscribers; i++) {
               expect(mockHandlerArray[i]).toHaveBeenCalledWith(mockEventData);
            }

            for (var i = 0; i < numberOfUnsubscribers; i++) {
               sps.unsubscribe(testSigName, mockHandlerArray[i]);
            }

            sps.publish(testSigName, mockEventData);
            var numberOfHandlersCalledTwice = 0;
            
            for (var i = 0; i < numberOfSubscribers; i++) {
               if (mockHandlerArray[i].calls.count() == 2) {
                  numberOfHandlersCalledTwice++;
               }
            }
            expect(numberOfHandlersCalledTwice).toEqual(numberOfSubscribers - numberOfUnsubscribers);
         });
      });

      function GivenNMockSubsciber(sps, handlerArray, numberOfSubscribers) {
         for (var i = 0; i < numberOfSubscribers; i++) {
            var tmp = jasmine.createSpy('mockHandler' + i);
            handlerArray.push(tmp);
            sps.subscribe(testSigName, tmp);
         }
      }
   });
});
