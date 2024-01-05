import { 
  VerifiableCredential, 
  PresentationExchange 
} from "@web5/credentials";

export const presentationDefinition = {
  'id'                : 'presDefId123',
  'name'              : 'Swifties Fan Club Presentation Definition',
  'purpose'           : 'for proving membership in the fan club',
  'input_descriptors' : [
    {
      'id'          : 'legitness',
      'purpose'     : 'are you legit or not?',
      'constraints' : {
        'fields': [
          {
            'path': [
              '$.credentialSubject.legit',
            ]
          }
        ]
      }
    }
  ]
};

export const definitionValidation = PresentationExchange.validateDefinition({ presentationDefinition });

/**
 * Verfiable Presentationを検証するメソッド
 */
export const verifyVc = async (
  signedVcJwt
) => {
  var verificationResult;
  try {
    verificationResult = await VerifiableCredential.verify({ vcJwt: signedVcJwt });
    console.log('\nVC Verification successful!\n');
  } catch (err) {
    console.error('\nVC Verification failed: ' + err.message + '\n');
  } finally {
    console.log("verificationResult:", verificationResult)
  }
}

/**
 * VCを整形するメソッド
 */
export const parseVc = async(
  signedVcJwt
) => {
  const parsedVC = await VerifiableCredential.parseJwt({ vcJwt: signedVcJwt });
  return parsedVC;
}
