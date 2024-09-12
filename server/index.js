import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
mongoose.connect("mongodb+srv://abhijeet123:abhijeet123@abhijeet.5phjy.mongodb.net/myLoginRegisterDB",
).then(()=>{console.log("DB connected");
})

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})
const User = new mongoose.model("User",userSchema);
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors());


app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Server error:', error); // Log the error
        res.status(500).json({ message: 'Internal Server Error' }); // Send a proper 500 response
    }
});
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ email: email });
  
      if (user) {
        // Check if the password matches the hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
  
        if (isPasswordMatch) {
          res.send({ message: "Login successful", user: user });
        } else {
          res.status(401).send({ message: "Password didn't match" });
        }
      } else {
        res.status(404).send({ message: "User not registered" });
      }
    } catch (error) {
      res.status(500).send({ message: "Server error", error: error.message });
    }
  });

app.listen(9000, () => {
    console.log('Server running on port 9000');
  });

