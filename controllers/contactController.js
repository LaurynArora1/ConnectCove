//In routes , we define the route as well as the http request
//and also what function/method will be  executed once that rquest is made
//but that leads to messy code so, we definr all the the actual functions that will be 
//executed on particular http request and at a particular route here

//We also need to define label for each of these functions which consist of the description, route and the access related info

const asyncHandler=require("express-async-handler");
const Contact=require("../models/contactModel");
//@desc Get all contacts
//@route GET /api/contacts/
//@access private

const getContacts=asyncHandler(async(req,res)=>{
    const contacts=await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access private

const getContact=asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//@desc Create contact
//@route POST /api/contacts/
//@access private

const createContact=asyncHandler(async(req,res)=>{
    console.log("The request body is: ",req.body);
    const {name, email,phone}=req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const contact= await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id,
    });

    res.status(201).json(contact);
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private 
const updateContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    const updatedContact= await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json({message:`Update Contact for ${req.params.id} with ${updatedContact}`});
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private 
const deleteContact=asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.deleteOne();
    res.status(200).json(contact);
});

module.exports={getContacts, getContact, createContact,updateContact, deleteContact}




