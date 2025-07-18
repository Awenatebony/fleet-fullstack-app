router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "All fields required" });

  try {
    const exist = await User.findOne({ email });
    if (!exist) return res.status(400).json({ message: "User not found" });

    const matchedPassword = await bcrypt.compare(password, exist.password);
    if (!matchedPassword) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: exist._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: "Login successfully",
      token,
      user: {
        id: exist._id,
        email: exist.email
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
    console.error(error.message);
  }
});
