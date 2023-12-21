// Import test libraries and dependencies

// Test for login API
describe('POST /login', () => {

    it('should return 400 if email is missing', async () => {
      const res = await request(app).post('/login').send({
        password: 'password123' 
      });
      expect(res.statusCode).toEqual(400);
    });
  
    it('should return 400 if password is missing', async () => {
      // ...
    });
  
    it('should return 401 if invalid credentials', async () => {
      // ...
    });
  
    it('should return 200 and token if valid credentials', async () => {
      // ...
    });
  
  });
  
  // Test for user registration API
  describe('POST /users', () => {
    
    // Validations
    it('should return 400 if invalid email', async () => {
      // ...
    });
  
    // DB interactions
    it('should successfully create new user', async () => {
      // ...
    });
  
  });
  
  // Test for forgot password API
  describe('POST /forgot-password', () => {
  
    // Input validations
    it('should return 400 if no email provided', async () => {
      // ...
    });
  
    // DB interactions
    it('should return 404 if user not found', async () => {
      // ... 
    });
  
    it('should reset token in db if user found', async () => {
     // ...
    });
  
  });