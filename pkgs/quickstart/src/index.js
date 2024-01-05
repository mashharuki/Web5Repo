import { Web5 } from '@web5/api';

/**
 * サンプルスクリプト
 */
const main = async() => {
    const { web5, did: aliceDid } = await Web5.connect();
    console.log("DID:", aliceDid)

    const { record } = await web5.dwn.records.create({
        data: 'Hello, Web5!',
        message: {
          dataFormat: 'text/plain',
        },
    });

    console.log('writeResult', record);
    // read
    const readResult = await record.data.text();
    console.log('readResult', readResult);
    
    // update
    const updateResult = await record.update({
        data: 'Hello, Web5! I am updated.',
    });

    console.log('updateResult', await record.data.text());
    
    const deleteResult = await web5.dwn.records.delete({
        message: {
          recordId: record.id
        },
    });

    console.log('deleteResult', deleteResult);
};

main()
    .then(() => {
        process.exitCode = 1
    })
    .catch((error) => {
        console.error("error:", error);
    })