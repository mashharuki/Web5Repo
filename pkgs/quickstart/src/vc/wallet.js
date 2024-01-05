import { PresentationExchange } from "@web5/credentials";

/**
 * Satisfy Presentation Definition method
 */
export const satisfyPresentationDefinition = (
  signedVcJwt,
  presentationDefinition
) => {
  // Does VC Satisfy the Presentation Definition
  try {
    PresentationExchange.satisfiesPresentationDefinition({
      vcJwts: [signedVcJwt], 
      presentationDefinition: presentationDefinition
    });
    console.log('\nVC Satisfies Presentation Definition!\n');
  } catch (err) {
    console.error('VC does not satisfy Presentation Definition: ' + err.message);
  }
}

/**
 * create Verifiable Presentation method
 */
export const createVerifiablePresentation = (
  signedVcJwt,
  presentationDefinition
) => {
  const presentationResult = PresentationExchange.createPresentationFromCredentials({
    vcJwts: [signedVcJwt], 
    presentationDefinition: presentationDefinition }
  );
  console.log('\nPresentation Result: ' + JSON.stringify(presentationResult));
  return presentationResult;
}
