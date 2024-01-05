import { 
  VerifiableCredential, 
} from "@web5/credentials";

/**
 * SwiftiesFanClub
 */
export class SwiftiesFanClub {

  constructor(level, legit) {
    // indicates the fan's dedication level
    this.level = level; 

    // indicates if the fan is a genuine Swiftie
    this.legit = legit; 
  }

  /**
   * create VC method
   */
  issueVc = async(
    issuerDid,
    userDid
  ) => {
    const vc = await VerifiableCredential.create({
      type: 'SwiftiesFanClub',
      issuer: issuerDid,
      subject: userDid,
      data: new SwiftiesFanClub('Stan', true)
    });
    return vc;
  }

  /**
   * sign VC method
   */
  signVc = async(
    issuerDid,
    vc
  ) => {
    const signedVcJwt = await vc.sign({ did: issuerDid });
    return signedVcJwt;
  }
}
