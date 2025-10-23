import api from "../../../../lib/services/api";
import { toast } from "react-toastify";

export const getAllDiscounts=async(setData)=>{
    try{
        const res=await api.get('discounts');
       
        setData(res.data);
    }catch(err){
        console.error("Error fetching menu items:", err);
    }
}

export const addDiscount=async(values)=>{
    try{
        const res=await api.post('discounts',values);
        if(res.data){
            toast.success("Discount Added Successfully");
        }    
    }catch(err){
        console.error("Error adding Discount", err);
    }
}
export const deleteDiscount=async(id)=>{
    try{
        await api.delete(`discounts/${id}`);  
       
    }catch(err){
        console.error("Error fetching menu items:", err);
    }
}

export const editDiscount = async (id,values) => {
    try{
        const res= await api.patch(`discounts/${id}`,values);
        if(res.data){
            toast.success("Discount Updated Successfully");
        }
    }catch(err){
        console.error("Error", err);
    }
}

export const getAllItems=async(setItems)=>{
    try{
        const res=await api.get('items');
        setItems(res.data)
    }catch(err){
        console.error("Error fetching  items:", err);
    }
}