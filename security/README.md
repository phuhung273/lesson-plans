### Hmac
- Verify integrity and authenticity of a message
- Flow: 
  - Client will be given a key 
  - Client use this key to create a signature and send along with the request

### Asymmetric Encryption
- Encrypt message using a keypair
- Flow:
  - Alice, Bob store secret key on their own device
  - Alice use Bob's public key to encrypt message and send it to Bob
  - Bob use his private key to decrypt this message
  - Only Bob can read it
- Where: E2E encryption

