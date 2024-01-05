# クイックスタート用のコマンド

## 実行結果例

```bash
pnpm run start
```

```bash
DID: did:ion:EiCRPJMBmE2darb2az_2aKOsYdImb5amHAfBKrIOf4OY7w:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkd24tc2lnIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoiM1NFbHd0eXJjMUNjS25xdTdRVmtlb05BTEMtaERoTWRNX0c1eTFhcTYwWSJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiJdLCJ0eXBlIjoiSnNvbldlYktleTIwMjAifSx7ImlkIjoiZHduLWVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJxSXhFSGxSNGEyQU1qSEVVendFcDhHWG5HRFBUOFBHcEVGUS1FY3dSNjdJIiwieSI6IkpXSGhTcUppck5EU284U0ZtU1E3YlBJNzM5NWdRc1pmbVFOOGZoWHMweGMifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7ImVuY3J5cHRpb25LZXlzIjpbIiNkd24tZW5jIl0sIm5vZGVzIjpbImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduNCIsImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduMSJdLCJzaWduaW5nS2V5cyI6WyIjZHduLXNpZyJdfSwidHlwZSI6IkRlY2VudHJhbGl6ZWRXZWJOb2RlIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlDaUMxb0REWVI5QkdGTk05VFhtMGVRSXp5aXdnTzI1dkpEQXc3SlJUUjR0dyJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpRGRHV0Q5UVRMZ3JDUzd3Q0tKajJKLVpFOWZFM1ZFVFBiT3BfcG1HUTRKUEEiLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaURwLW9zUGE2emlGNWNmM1d2cE9DUGFNaGw5akZtc1FWNmhCaWROX0d2Z2pRIn19
writeResult Record {
  _agent: <ref *1> Web5UserAgent {
    agentDid: 'did:key:z6MkuAmaQguVGgbqQpHE1kmWJw11KNR7LZd2iRwTaqFAm8nB',
    appData: AppDataVault {
      _vaultUnlockKey: [Uint8Array],
      _keyDerivationWorkFactor: 650000,
      _store: [LevelStore]
    },
    keyManager: KeyManager {
      _agent: [Circular *1],
      _store: [KeyStoreDwn],
      _kms: [Map],
      _defaultSigningKey: [Object]
    },
    didManager: DidManager {
      _didMethods: [Map],
      _agent: [Circular *1],
      _store: [DidStoreDwn]
    },
    didResolver: DidResolver { didResolvers: [Map], cache: [DidResolverCacheLevel] },
    dwnManager: DwnManager { _agent: [Circular *1], _dwn: [Dwn] },
    identityManager: IdentityManager {
      _agent: [Circular *1],
      _store: [IdentityStoreDwn]
    },
    rpcClient: Web5RpcClient { transportClients: [Map] },
    syncManager: SyncManagerLevel {
      _agent: [Circular *1],
      _db: [ClassicLevel],
      _syncIntervalId: Timeout {
        _idleTimeout: 120000,
        _idlePrev: [TimersList],
        _idleNext: [TimersList],
        _idleStart: 4910,
        _onTimeout: [Function (anonymous)],
        _timerArgs: undefined,
        _repeat: 120000,
        _destroyed: false,
        [Symbol(refed)]: true,
        [Symbol(kHasPrimitive)]: false,
        [Symbol(asyncId)]: 6704,
        [Symbol(triggerId)]: 0
      }
    }
  },
  author: 'did:ion:EiCRPJMBmE2darb2az_2aKOsYdImb5amHAfBKrIOf4OY7w:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkd24tc2lnIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoiM1NFbHd0eXJjMUNjS25xdTdRVmtlb05BTEMtaERoTWRNX0c1eTFhcTYwWSJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiJdLCJ0eXBlIjoiSnNvbldlYktleTIwMjAifSx7ImlkIjoiZHduLWVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJxSXhFSGxSNGEyQU1qSEVVendFcDhHWG5HRFBUOFBHcEVGUS1FY3dSNjdJIiwieSI6IkpXSGhTcUppck5EU284U0ZtU1E3YlBJNzM5NWdRc1pmbVFOOGZoWHMweGMifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7ImVuY3J5cHRpb25LZXlzIjpbIiNkd24tZW5jIl0sIm5vZGVzIjpbImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduNCIsImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduMSJdLCJzaWduaW5nS2V5cyI6WyIjZHduLXNpZyJdfSwidHlwZSI6IkRlY2VudHJhbGl6ZWRXZWJOb2RlIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlDaUMxb0REWVI5QkdGTk05VFhtMGVRSXp5aXdnTzI1dkpEQXc3SlJUUjR0dyJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpRGRHV0Q5UVRMZ3JDUzd3Q0tKajJKLVpFOWZFM1ZFVFBiT3BfcG1HUTRKUEEiLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaURwLW9zUGE2emlGNWNmM1d2cE9DUGFNaGw5akZtc1FWNmhCaWROX0d2Z2pRIn19',
  target: 'did:ion:EiCRPJMBmE2darb2az_2aKOsYdImb5amHAfBKrIOf4OY7w:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkd24tc2lnIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoiM1NFbHd0eXJjMUNjS25xdTdRVmtlb05BTEMtaERoTWRNX0c1eTFhcTYwWSJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiJdLCJ0eXBlIjoiSnNvbldlYktleTIwMjAifSx7ImlkIjoiZHduLWVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJxSXhFSGxSNGEyQU1qSEVVendFcDhHWG5HRFBUOFBHcEVGUS1FY3dSNjdJIiwieSI6IkpXSGhTcUppck5EU284U0ZtU1E3YlBJNzM5NWdRc1pmbVFOOGZoWHMweGMifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7ImVuY3J5cHRpb25LZXlzIjpbIiNkd24tZW5jIl0sIm5vZGVzIjpbImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduNCIsImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduMSJdLCJzaWduaW5nS2V5cyI6WyIjZHduLXNpZyJdfSwidHlwZSI6IkRlY2VudHJhbGl6ZWRXZWJOb2RlIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlDaUMxb0REWVI5QkdGTk05VFhtMGVRSXp5aXdnTzI1dkpEQXc3SlJUUjR0dyJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpRGRHV0Q5UVRMZ3JDUzd3Q0tKajJKLVpFOWZFM1ZFVFBiT3BfcG1HUTRKUEEiLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaURwLW9zUGE2emlGNWNmM1d2cE9DUGFNaGw5akZtc1FWNmhCaWROX0d2Z2pRIn19',
  _remoteTarget: undefined,
  _attestation: undefined,
  _contextId: undefined,
  _descriptor: {
    interface: 'Records',
    method: 'Write',
    dataCid: 'bafkreiculmr7avp77qtfeum545luviw6r4o3drju2hzh6sghsjlafdmxea',
    dataSize: 12,
    dateCreated: '2024-01-05T02:41:28.330488Z',
    messageTimestamp: '2024-01-05T02:41:28.330488Z',
    dataFormat: 'text/plain'
  },
  _encryption: undefined,
  _recordId: 'bafyreibajxm3clafz2qc24sqvs4gnjvsrws4icmwigu4cu2vxvb73zb7zm',
  _encodedData: Blob { size: 12, type: 'text/plain' }
}
readResult Hello, Web5!
updateResult Hello, Web5! I am updated.
deleteResult { status: { code: 202, detail: 'Accepted' } }
```