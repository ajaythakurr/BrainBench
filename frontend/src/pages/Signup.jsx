import {Button} from '../components/ui/button'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {ArrowLeft} from 'lucide-react'

import {useState} from 'react'



export default function Signup(){

    const [formData,setFormData] = useState({
        name:"",
        email:"",
        password:"",
        role:""
    })
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center p-4">
            <div >
                <Button
                variant="ghost"
                className="mb-6 text-gray-600 hover:text-gray-900">

                <ArrowLeft />
                <span className="ml-4">Back to Home</span>
                </Button>
            </div>
            <div>
                <Card className="shadow-xl border-0">

                   <CardHeader className="text-center pb-6">
                        {/* Logo */}
                        <div className="flex items-center justify-center mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex justify-center items-center mr-3 ">
                                    <span className="text-white font-bold">BB</span>
                                </div>
                                <span className="text-2xl font-semibold text-gray-900 ">BrainBench</span>
                        </div>

                        <div className="text-2xl font-semibold text-gray-900 mb-2">Create Account</div>
                        <p className="text-gray-600">Join thousands of educators and students</p>
                   </CardHeader>

                    <CardContent>
                        <form>

                            <Label htmlFor="Name">Name</Label>
                            <Input type="text" name="Name" placeholder="John Doe"></Input>

                            <Label htmlFor="email">Email Adress</Label>
                            <Input type="email" name="email" placeholder="johndoe@gmail.com"></Input>

                            <Label htmlFor="role">Role</Label>
                            <select name="role" >
                                <option value="organizer">Organizer</option>
                                <option value="participant">Participant</option>
                            </select>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}