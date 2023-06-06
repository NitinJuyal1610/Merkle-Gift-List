const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
const verifyProof = require('../utils/verifyProof');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  const merkleTree = new MerkleTree(niceList);
  const validName = 'Norman Block';
  const index1 = niceList.findIndex((n) => n === validName);
  const proof1 = merkleTree.getProof(index1);

  const invalidName = 'Monster';
  const index2 = niceList.findIndex((n) => n === invalidName);
  const proof2 = merkleTree.getProof(index2);

  const { data: gift1 } = await axios.post(`${serverUrl}/gift`, {
    name: validName,
    proof: proof1,
  });
  console.log(validName, ' -> ', { gift1 });

  const { data: gift2 } = await axios.post(`${serverUrl}/gift`, {
    name: invalidName,
    proof: proof2,
  });
  console.log(invalidName, ' -> ', { gift2 });
}

main();
