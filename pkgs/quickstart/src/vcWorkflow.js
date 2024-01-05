import { DidKeyMethod } from '@web5/dids';
import { SwiftiesFanClub } from './vc/issuer.js';
import { 
  createVerifiablePresentation,
  satisfyPresentationDefinition
} from './vc/wallet.js';
import {  
  presentationDefinition,
  verifyVc,
  parseVc
} from './vc/verifier.js';
/**
 * VC関連の機能をワークフローに沿って試すスクリプト
 * VCの発行者：ファンクラブ
 * VC保有者：ファン(ここではアリス)
 * VCの検証者： スワッグ提供者
 */
const main = async() => {
  console.log(" ============================== [START] ============================== ")
  // create SwiftiesFanClub class
  const fanClubClass = new SwiftiesFanClub();
  // create issuer & alice DID
  const fanClubIssuerDid = await DidKeyMethod.create();
  const aliceDid = await DidKeyMethod.create();
  console.log(`fanClubIssuerDid : ${fanClubIssuerDid.did}`);
  console.log(`aliceDid : ${aliceDid.did}`);

  // VCを発行
  const vc = await fanClubClass.issueVc(fanClubIssuerDid.did, aliceDid.did);
  // VCに署名する(Issuerに依頼する)
  const signedVcJwt = await fanClubClass.signVc(fanClubIssuerDid, vc);

  // Verifiable Presentaionの定義に沿っているかチェックする
  satisfyPresentationDefinition(signedVcJwt, presentationDefinition);
  // create Verifiable Presentaion
  const vp = createVerifiablePresentation(signedVcJwt, presentationDefinition);

  // VCを検証
  await verifyVc(signedVcJwt)
  // VCを整形する
  const parsedVC = await parseVc(signedVcJwt);
  console.log("parsed VC:", parsedVC);
  console.log(" ============================== [END] ============================== ")
};

main()
  .then(() => {
    process.exitCode = 1
  })
  .catch((error) => {
    console.error("error:", error);
  })