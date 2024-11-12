const student = require("./studentModel");
const { client } = require("./redis");

exports.createStudent = async (req, res) => {
  try {
    const newStudent = new student(req.body);
    await newStudent.save();
    res.status(200).json(newStudent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

exports.getStudent = async (req, res) => {
  try {
    const students = await student.find();

    // Use setex correctly with a key (not the student object directly)
    client.setEx("students", 3600, JSON.stringify(students));
    // await client.set("surname", "magar"); // Store the value in Redis
    // const value = await client.get("surname"); // Retrieve the value from Redis
    // console.log(value); // Should log "jadhav"
    res.status(200).json(students);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
