const projects=require("../Models/projectSchema")

// addProject

exports.addProjects=async(req,res)=>{
    console.log("inside add project");
    const{title,language,github,website,overview}=req.body
    const projectImage=req.file.filename
    const userId=req.payload
    console.log(title,language,github,website,overview,projectImage,userId);
    try{
        const existingProject=await projects.findOne({github})

        if(existingProject){
            res.status(406).json("projects already exist in our collection...please add another one")
        }else{
            const newProject = new projects({title,language,github,website,overview,projectImage,userId})
            await newProject.save()
            res.status(200).json(newProject)

        }

       
    }catch{
        res.status(401).json(err)
    }
   
    
}

// getHomeProjects

exports.getHomeProjects=async(req,res)=>{
    
    try{
        const allProjects= await projects.find().limit(3)
        res.status(200).json(allProjects)

    }catch(err){
        res.status(401).json(err)
    }
}

// getUserProjects


exports.getUserProjects=async(req,res)=>{
    const userId= req.payload
    
    try{
        const userProjects= await projects.find({userId})
        res.status(200).json(userProjects)

    }catch(err){
        res.status(401).json(err)
    }
}

// getAllProjects


exports.getAllProjects=async(req,res)=>{

    const searchKey =req.query.search
    // console.log(searchKey);
    const query={
        language:{$regex:searchKey,$options: "i"}
    }
        
    try{
        const allProjects= await projects.find(query)
        res.status(200).json(allProjects)

    }catch(err){
        res.status(401).json(err)
    }
}

// editproject

exports.editUserProject=async(req,res)=>{
    const{title,language,github,website,overview,projectImage}=req.body
    const uploadImage= req.file?req.file.filename:projectImage
    const userId= req.payload
    const {pid}= req.params

    try{

        const updateProject = await projects.findByIdAndUpdate({_id:pid},{
            title,language,github,website,overview,projectImage:uploadImage,userId
        },{new:true})

        await updateProject.save()
        res.status(200).json(updateProject)
        }catch(err){
            res.status(401).json(err)
        }
    }


// deleteproject

exports.deleteProject= async(req,res)=>{
    const {pid}= req.params

    try{
        const deleteData = await projects.findByIdAndDelete({_id:pid})
        res.status(200).json(this.deleteData)
    }catch(err){
        res.status(401).json(err)
    }
}