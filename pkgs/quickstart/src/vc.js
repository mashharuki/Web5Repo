import { Web5 } from '@web5/api';
import { DidKeyMethod } from '@web5/dids';
import { VerifiableCredential } from "@web5/credentials";
import * as fs from 'fs';

const INPUT_FILE_PATH = "./src/data/sampleVC.json"

/**
 * VC関連の機能を試すためのサンプルスクリプト
 */
const main = async() => {
  const { web5, did: aliceDid } = await Web5.connect();
  console.log("DID:", aliceDid)

  // create issuer
  const issuer = await DidKeyMethod.create();
  console.log("issuer:", issuer)

  // VC発行
  const vc = await VerifiableCredential.create({
    type: 'EmploymentCredential',
    issuer: issuer,
    subject: aliceDid,
    expirationDate: '2026-09-30T12:34:56Z',
    data: {
      "position": "Software Developer",
      "startDate": "2024-01-05T12:34:56Z",
      "employmentStatus": "Contractor"
    }
  });

  console.log("Created VC:", vc)

  // VCに署名
  const vc_jwt = await vc.sign({ did: issuer });
  console.log("Signed VC:", vc_jwt)

  let errorsFound = false;
  const verificationResults = [];
  // VCを検証
  try {
    const verificationResult = await VerifiableCredential.verify({ vcJwt: vc_jwt});
    
    //no error thrown
    verificationResults.push({
      jwt: vc_jwt,
      result: verificationResult,
      isValid: true,
      error: null
    });
    console.log("VC Verification successful!")
  } catch (error) {
    errorsFound = true;
    verificationResults.push({
      jwt: vc_jwt,
      result: null,
      isValid: false,
      error: error.message
    });
    console.error("VC Verification failed:", error)
  } finally {
    console.log("verificationResults:", verificationResults)
  }
  // JWTを変形する
  const parsedVC = VerifiableCredential.parseJwt({ vcJwt: vc_jwt })
  console.log("parsedVC:", parsedVC);
  // JSONファイルに書き出す。
  fs.writeFileSync(INPUT_FILE_PATH, JSON.stringify(JSON.parse(parsedVC)));

  // VCをDWNに登録する。
  const { record } = await web5.dwn.records.create({
    data: vc_jwt,
    message: {
      schema: 'EmploymentCredential',
      dataFormat: 'application/vc+jwt',
    },
  });
  const { status } = await record.send(aliceDid);

  console.log("sending VC status:", status)
  
  // VCをDWNから取得する。
  const response = await web5.dwn.records.query({
    from: aliceDid,
    message: {
      filter: {
        schema: 'EmploymentCredential',
        dataFormat: 'application/vc+jwt',
      },
    },
  });
  console.log("response:", response)
  /*
  const signedVcJwt = await response[0].text();

  console.log("signedVcJwt from DWN:", signedVcJwt)
  */
};

main()
  .then(() => {
      process.exitCode = 1
  })
  .catch((error) => {
      console.error("error:", error);
  })