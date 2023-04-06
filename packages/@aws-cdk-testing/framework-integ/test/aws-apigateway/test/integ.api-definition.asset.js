"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const cdk = require("aws-cdk-lib");
const integ_tests_alpha_1 = require("@aws-cdk/integ-tests-alpha");
const apigateway = require("aws-cdk-lib/aws-apigateway");
/*
 * Stack verification steps:
 * * `curl -s -o /dev/null -w "%{http_code}" <CFN output PetsURL>` should return HTTP code 200
 * * `curl -s -o /dev/null -w "%{http_code}" <CFN output BooksURL>` should return HTTP code 200
 */
const app = new cdk.App();
const stack = new cdk.Stack(app, 'integtest-restapi-fromdefinition-asset');
const api = new apigateway.SpecRestApi(stack, 'my-api', {
    cloudWatchRole: true,
    apiDefinition: apigateway.ApiDefinition.fromAsset(path.join(__dirname, 'sample-definition.yaml')),
});
api.root.addResource('books').addMethod('GET', new apigateway.MockIntegration({
    integrationResponses: [{
            statusCode: '200',
        }],
    passthroughBehavior: apigateway.PassthroughBehavior.NEVER,
    requestTemplates: {
        'application/json': '{ "statusCode": 200 }',
    },
}), {
    methodResponses: [{ statusCode: '200' }],
});
new cdk.CfnOutput(stack, 'PetsURL', {
    value: api.urlForPath('/pets'),
});
new cdk.CfnOutput(stack, 'BooksURL', {
    value: api.urlForPath('/books'),
});
new integ_tests_alpha_1.IntegTest(app, 'restapi-fromdefinition', {
    testCases: [stack],
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWcuYXBpLWRlZmluaXRpb24uYXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnRlZy5hcGktZGVmaW5pdGlvbi5hc3NldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE2QjtBQUM3QixtQ0FBbUM7QUFDbkMsa0VBQXVEO0FBQ3ZELHlEQUF5RDtBQUV6RDs7OztHQUlHO0FBRUgsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDMUIsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSx3Q0FBd0MsQ0FBQyxDQUFDO0FBRTNFLE1BQU0sR0FBRyxHQUFHLElBQUksVUFBVSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFO0lBQ3RELGNBQWMsRUFBRSxJQUFJO0lBQ3BCLGFBQWEsRUFBRSxVQUFVLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO0NBQ2xHLENBQUMsQ0FBQztBQUVILEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxVQUFVLENBQUMsZUFBZSxDQUFDO0lBQzVFLG9CQUFvQixFQUFFLENBQUM7WUFDckIsVUFBVSxFQUFFLEtBQUs7U0FDbEIsQ0FBQztJQUNGLG1CQUFtQixFQUFFLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLO0lBQ3pELGdCQUFnQixFQUFFO1FBQ2hCLGtCQUFrQixFQUFFLHVCQUF1QjtLQUM1QztDQUNGLENBQUMsRUFBRTtJQUNGLGVBQWUsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxDQUFDO0NBQ3pDLENBQUMsQ0FBQztBQUVILElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFO0lBQ2xDLEtBQUssRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztDQUMvQixDQUFDLENBQUM7QUFFSCxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRTtJQUNuQyxLQUFLLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7Q0FDaEMsQ0FBQyxDQUFDO0FBRUgsSUFBSSw2QkFBUyxDQUFDLEdBQUcsRUFBRSx3QkFBd0IsRUFBRTtJQUMzQyxTQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUM7Q0FDbkIsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBJbnRlZ1Rlc3QgfSBmcm9tICdAYXdzLWNkay9pbnRlZy10ZXN0cy1hbHBoYSc7XG5pbXBvcnQgKiBhcyBhcGlnYXRld2F5IGZyb20gJ2F3cy1jZGstbGliL2F3cy1hcGlnYXRld2F5JztcblxuLypcbiAqIFN0YWNrIHZlcmlmaWNhdGlvbiBzdGVwczpcbiAqICogYGN1cmwgLXMgLW8gL2Rldi9udWxsIC13IFwiJXtodHRwX2NvZGV9XCIgPENGTiBvdXRwdXQgUGV0c1VSTD5gIHNob3VsZCByZXR1cm4gSFRUUCBjb2RlIDIwMFxuICogKiBgY3VybCAtcyAtbyAvZGV2L251bGwgLXcgXCIle2h0dHBfY29kZX1cIiA8Q0ZOIG91dHB1dCBCb29rc1VSTD5gIHNob3VsZCByZXR1cm4gSFRUUCBjb2RlIDIwMFxuICovXG5cbmNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG5jb25zdCBzdGFjayA9IG5ldyBjZGsuU3RhY2soYXBwLCAnaW50ZWd0ZXN0LXJlc3RhcGktZnJvbWRlZmluaXRpb24tYXNzZXQnKTtcblxuY29uc3QgYXBpID0gbmV3IGFwaWdhdGV3YXkuU3BlY1Jlc3RBcGkoc3RhY2ssICdteS1hcGknLCB7XG4gIGNsb3VkV2F0Y2hSb2xlOiB0cnVlLFxuICBhcGlEZWZpbml0aW9uOiBhcGlnYXRld2F5LkFwaURlZmluaXRpb24uZnJvbUFzc2V0KHBhdGguam9pbihfX2Rpcm5hbWUsICdzYW1wbGUtZGVmaW5pdGlvbi55YW1sJykpLFxufSk7XG5cbmFwaS5yb290LmFkZFJlc291cmNlKCdib29rcycpLmFkZE1ldGhvZCgnR0VUJywgbmV3IGFwaWdhdGV3YXkuTW9ja0ludGVncmF0aW9uKHtcbiAgaW50ZWdyYXRpb25SZXNwb25zZXM6IFt7XG4gICAgc3RhdHVzQ29kZTogJzIwMCcsXG4gIH1dLFxuICBwYXNzdGhyb3VnaEJlaGF2aW9yOiBhcGlnYXRld2F5LlBhc3N0aHJvdWdoQmVoYXZpb3IuTkVWRVIsXG4gIHJlcXVlc3RUZW1wbGF0ZXM6IHtcbiAgICAnYXBwbGljYXRpb24vanNvbic6ICd7IFwic3RhdHVzQ29kZVwiOiAyMDAgfScsXG4gIH0sXG59KSwge1xuICBtZXRob2RSZXNwb25zZXM6IFt7IHN0YXR1c0NvZGU6ICcyMDAnIH1dLFxufSk7XG5cbm5ldyBjZGsuQ2ZuT3V0cHV0KHN0YWNrLCAnUGV0c1VSTCcsIHtcbiAgdmFsdWU6IGFwaS51cmxGb3JQYXRoKCcvcGV0cycpLFxufSk7XG5cbm5ldyBjZGsuQ2ZuT3V0cHV0KHN0YWNrLCAnQm9va3NVUkwnLCB7XG4gIHZhbHVlOiBhcGkudXJsRm9yUGF0aCgnL2Jvb2tzJyksXG59KTtcblxubmV3IEludGVnVGVzdChhcHAsICdyZXN0YXBpLWZyb21kZWZpbml0aW9uJywge1xuICB0ZXN0Q2FzZXM6IFtzdGFja10sXG59KTtcbiJdfQ==