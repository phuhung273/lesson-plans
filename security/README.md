### Hmac
- Using a shared key to verify integrity and authenticity of a message
- Flow: 
  - Client will be given a key 
  - Client use this key to create a signature and send along with the request

### Asymmetric Encryption
- Using a keypair to encrypt messages
- Flow:
  - Alice, Bob store secret key on their own device
  - Alice use Bob's public key to encrypt message and send it to Bob
  - Bob use his private key to decrypt this message
  - Only Bob can read it
- Where: E2E encryption

### HMAC and RSA
- HMAC is better in performance, simplicity
- When HMAC: only 2 sides evolved
  - payment provider and merchant, only payment provider have to verify merchant
- When RSA: public verification
  - E2E encryption

### JSON Web Token
- A standard way to securely send a message
- 3 parts: algorithm, data and signature
- Oldschool way: [see Hmac](#hmac) - send body and signature (can be in header, also in body)
- JWT way: everything in an encoded message