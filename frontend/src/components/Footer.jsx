
import {Copyright} from 'lucide-react'
export default function Footer(){
    var year = new Date().getFullYear();
    return (
        <div className="flex flex-col bg-gray-900 text-white px-2">
            <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div col-span-1 md:col-span-2 >
                    <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-2">
                            <span className="text-white text-sm font-bold">EM</span>
                        </div>
                        <span className="text-xl font-semibold">BrainBench</span>
                    </div>
                    <p className="text-gray-400 max-w-md">The leading online examination platform trusted by educators worldwide. Create, manage, and analyze exams with ease.</p>
                </div>
                <div className=" flex flex-col">
                    <h4 className="font-semibold mb-4">Quick Links</h4>
                    <ul className ="text-gray-400 space-y-2">
                        <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                        <li><a href="/" className="hover:text-white transition-colors">All Exams</a></li>
                        <li><a href="/" className="hover:text-white transition-colors">about</a></li>
                        <li><a href="/" className="hover:text-white transition-colors">Pricing</a></li>
                    </ul>
                    
                </div>
                <div>
                    <h4 className="font-semibold mb-4">Support</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="/" className="hover:text-white transition-colors">Contact Us</a></li>
                        <li><a href="/" className="hover:text-white transition-colors">Help Center</a></li>
                        <li><a href="/" className="hover:text-white transition-colors">Privacy Policy</a></li>
                        <li><a href="/" className="hover:text-white transition-colors">Terms of Service</a></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-gray-800 py-4" >
                <p className="flex items-center text-xs"> <Copyright size={12}/> <span> {year} BrainBench. All rights reserved.</span> </p>
            </div>
        </div>

        

    )
}