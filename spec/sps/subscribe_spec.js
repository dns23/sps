describe("SPS Subscribe", function() {

   describe("Given single SPS instance", function() {
      var sps;
      var testSigName = "TEST_SIGNAL";
      var typesArray = [37, "", true, undefined, {a:1}];
      var testType = randomChoice(typesArray);

      beforeEach(function() {
         sps = new SPS_Manager();
      });

      it("when subscribe handler is a " + typeof(testType) + " type then an API warning should occur", function() {
         alert = jasmine.createSpy();
         sps.subscribe(testSigName, testType);
         expect(alert).toHaveBeenCalledWith("SPS API error.");
      });

      it("when subscribe handler is a function then no API warning should occur", function() {
         function handler() {};
         alert = jasmine.createSpy();
         sps.subscribe(testSigName, handler);
         expect(alert).not.toHaveBeenCalled();
      });

      describe("AND Given caller has overloaded API require function", function() {
         it("when subscribe handler is a " + typeof(testType) + 
               " type then the callers require function is called", function() {
            SPS_REQUIRE = jasmine.createSpy();
            sps.subscribe(testSigName, testType);
            expect(SPS_REQUIRE).toHaveBeenCalled();
         });
      });

      describe("AND Given event handler is subscribed too " + testSigName, function() {
         var numberOfPublishes = 1 + Math.floor(20 * Math.random());
         var mockHandler;
         var eventData;
         var uut;
         
         beforeEach(function() {
            mockHandler = jasmine.createSpyObj('mockHandler', ['recieve']);
            eventData = Math.random();
            uut = new SPS_Manager();
            uut.subscribe(testSigName, mockHandler.recieve);
         });

         it("when "+ testSigName +" is published then " + 
               testSigName +" function should be executed", function() {
            uut.publish(testSigName);
            expect(mockHandler.recieve).toHaveBeenCalled();
         });

         it("when "+ testSigName +" is published with event data then " + 
               testSigName +" function should recieve the same event data", function() {
            uut.publish(testSigName, eventData);
            expect(mockHandler.recieve).toHaveBeenCalledWith(eventData);
         });

         it("when "+ testSigName +" is published " + numberOfPublishes + " times then " + 
               testSigName +" function should be executed " + numberOfPublishes + " times", function() {
            for (var i = 0; i < numberOfPublishes; ++i) {
               uut.publish(testSigName);
            }
            expect(mockHandler.recieve.calls.count()).toEqual(numberOfPublishes);
         });
      });
   });
});
