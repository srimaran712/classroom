const Express=require('express')
const app=Express()//creating an express application

const Cors=require('cors')
const bcrypt=require('bcrypt')//for hashing passwords
const bodyParser=require('body-parser')
const jwt =require('jsonwebtoken')
const Mongoose=require('mongoose')
app.use(bodyParser.json())

app.use(Cors())

//connecting to database
Mongoose.connect("mongodb://127.0.0.1:27017/classroomDatabase")
const userSchema=Mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true,},
    role:{type:String,enum:['Principal','Teacher',"Student"],required:true},
    classroom:{ type: Mongoose.Schema.Types.ObjectId, ref: 'classroom' },
})
const User=Mongoose.model("Users",userSchema)
/// creating for the classroom
const classSchema=Mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    startTime:{type:String,required:true},
    endTime:{type:String,required:true},
    days:[{type:String}],
    teacher: { type: Mongoose.Schema.Types.ObjectId, ref: 'Users' }, // Reference to Teacher
    students: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    googlemeet:{type:String, required:true}
})
//creating schema for the user 


//creating models and passing schemas to collections

//creating class model
const Class=Mongoose.model("classroom",classSchema)

///adding principal account before

const addPrincipal=async ()=>{
    const principalemail="principal@classroom.com"
    const principalpassword="Admin"

    try{
        const existinguser= await User.findOne({email:principalemail})

        if(existinguser){
      
           console.log('Principal account   created already.');
        }
        else{
            const hashingpassword= await bcrypt.hash(principalpassword,10)

            const newPrincipal= new User({
                username:"palaniappan",
                email:principalemail,
                password:hashingpassword,
                role:"Principal"
            })
           await newPrincipal.save()
           console.log('Principal account created  successfully.');
        }
    }
    catch (error){
         console.error(error)
    }
}
addPrincipal()

//login credential
const jwt_secret='your_secret_key'
app.post('/login',async function(req,res){
    const {loginEmail,loginPassword}=req.body
try{
    const existingone= await User.findOne({email:loginEmail})
    if(!existingone){
      return  res.status(400).json({error:'Invalid email or password'})
    }
    const comparingpassword= await bcrypt.compare(loginPassword,existingone.password)
    if(!comparingpassword){
       return res.status(400).json({error:'Invalid email or password'})
    }
    const token =jwt.sign({id:existingone._id,role:existingone.role},jwt_secret,{expiresIn:'1h'})
    return res.json({token})
}
catch(error){
   return  res.status(500).json({error:'server error'})
}
})

//middleware

const authenticateJWT = (req, res, next) => {
   // const token = req.header('Authorization').replace('Bearer ', '');
   const authHeader = req.header('Authorization');
   console.log('Authorization Header:', authHeader); // Debugging

   // if (!token) {
       //return res.status(401).json({ error: 'Access denied, token missing!' });
   // }
   if (!authHeader) {
    return res.status(401).json({ error: 'Access denied, token missing!' });
}
  const token = authHeader.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token,jwt_secret );
        req.user = decoded; // Attach the user info to the request object
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};


app.get('/principal-dashboard', authenticateJWT, (req, res) => {
    if (req.user.role !== 'Principal') {
        return res.status(403).json({ error: 'Access denied' });
    }

    // Fetch and send data relevant to the Principal dashboard
    res.json({ message: 'Welcome to the Principal dashboard!' });
});
//creating account creation form
app.post('/create-account', async function(req,res){
   
      const {username,useremail,userpassword,userrole}=req.body

      try{
        const existingAccount= await User.findOne({email:useremail})
        if(existingAccount){
            return res.status(400).json({error:'user already exists'})
        }
        //hashing account password
        const accounthashing= await bcrypt.hash(userpassword,10)
        const newAccount= new User({
           username:username,
           email:useremail,
           password:accounthashing,
           role:  userrole
        })
        await newAccount.save()
        res.status(200).json({message:'account created successfully ✔️'})
      }catch(error){
        res.status(500).json({'Server issue':error})
      }

})
//creating the user creation form


//teachers list

app.get('/teachers',async function(req,res){
    try{
        const teachers= await User.find({role:"Teacher"})
        res.status(200).json({teachers})
    }catch(error){
        res.status(400).json({error})
    }
})
//students list

app.get('/students',async function(req,res){
    try{
        const students=await User.find({role:"Student"})
        res.status(200).json({students})
    }
    catch(error){
        res.status(400).json({error})
    }
})

///create class point

app.post('/create-class',async function(req,res){
    const {classname,starttime,endtime,link,days,teacherobjid, studentid}=req.body
    const existingClass= await Class.findOne({name:classname})
    if(existingClass){
          return res.status(400).json({error:'class already created'})
    }

    try{
        const newClassroom = new Class({
            name:classname,
            startTime:starttime,
            endTime:endtime,
            days:days,
            teacher:teacherobjid,
            students:studentid,
            googlemeet:link
        })
        await newClassroom.save()

        await User.updateMany(
            { _id: { $in: studentid } },
            { $set: { classroom: newClassroom._id } }
        );
        return res.status(200).json({message:'Class created successfully'})
    }catch(error){
        return res.status(500).json({error})
    }

  
})

//getting classroom details
app.get('/classroom',async function(req,res){
    const createdClass= await Class.find().populate("teacher","username")
    return res.status(200).json({createdClass})
})

///teacher dashboard

app.get('/dashboard-teacher', authenticateJWT,async function(req,res){
    if (req.user.role !== 'Teacher') {
        return res.status(403).json({ error: 'Access denied' });
    }

    try{
        const classDetails= await Class.findOne({teacher:req.user.id}).populate("students","username email").populate("teacher","username")
        
        if(!classDetails){
            return res.status(400).json({error:'invalid credentials'})
            
        }
        else{
            return res.status(200).json({classDetails})
        }
    }catch(error)
   {
    console.error('Error fetching class details:', error);
    return res.status(500).json({message:'internal error'})
   }
})

app.get('/dashboard-students', authenticateJWT, async (req, res) => {
    if (req.user.role !== "Student") {
      //  return res.status(403).json({ message: 'Access denied' });
        
    }

   // try {
        //const userId = Mongoose.Types.ObjectId(req.user.id); // Convert to ObjectId if needed
     //   const scheduledetails = await Class.findOne({ students: userId });
     //   if (!scheduledetails) {
           // return res.status(404).json({ error: 'No schedule found' });
      //  }
      //  res.status(200).json({ scheduledetails });
   // } catch (error) {
     //   res.status(500).json({ error });
        //console.log(req.user.role)
       
       
   // }
   try {
    // Find the student by ID and populate the 'classroom' field
    const student = await User.findById(req.user.id).populate({
        path: 'classroom',
        select: 'name startTime endTime googlemeet students teacher',
        populate:[ {
            path: 'teacher',
            select: 'username'  // Populate the teacher's username
        },
        {
            path:'students',
            select:'username'
        }
    ]
       

    });
    console.log('Student Data:', student);
    console.log(student.classroom)
    if (!student || !student.classroom) {
        return res.status(404).json({ error: 'Classroom information not found' });
        
    }

    // Send the classroom details as the response
    res.status(200).json({ classroom: student.classroom });
} catch (error) {
    console.error('Error fetching classroom details:', error.message);
    res.status(500).json({ error: 'Internal server error' });
}
});

///delete teachers based on id

app.delete('/teachers/:id', async function(req,res){
    const id=req.params.id
    const deleteteacher = await User.findByIdAndDelete(id)
    return res.status(200).json({message:'successfully deleted'})
})

app.delete('/students/:id', async function(req,res){
    const id=req.params.id
    const deletestudent = await User.findByIdAndDelete(id)
    return res.status(200).json({message:'successfully deleted'})
})

app.listen(8080)
