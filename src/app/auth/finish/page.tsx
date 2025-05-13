"use client";
import SiteIdentifierTitle from "@/components/common/SiteIdentifier";
import AvatarUpload from "@/components/common/ui/AvatarUpload";
import Button from "@/components/common/ui/Button";
import LoadingSpinner from "@/components/common/ui/LoadingSpinner";
import CreateDoctor from "@/components/forms/CreateDoctor";
import es from "@/sources/lang.es";
import { UseAuthStore } from "@/store/useAuthStore";
import { UserRole } from "@/types/User";
import { useState } from "react";
import { FiLogIn } from "react-icons/fi";

export default function AuthFinish() {
    const [loading, setLoading] = useState(true);
    const { user } = UseAuthStore();
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const formDataObj = Object.fromEntries(formData.entries());

      const hours = formData.getAll("business_hours")
      console.log(hours);
      
      console.log(formDataObj);
      setLoading(true);
    }
    
    return (
        <main className="relative flex justify-center items-center size-full py-8">
          {loading && <LoadingSpinner className="absolute" />}
          <form onSubmit={handleSubmit}  method="post" className={`border border-primary-200 p-8 rounded-2xl w-full max-w-lg ${loading ? "opacity-20 pointer-events-none" : ""}`}>
              <SiteIdentifierTitle name={es.login.title} />
              <div className="text-center flex flex-col">
                <span>{user?.username}</span>
                <span>{user?.role}</span>
              </div>
              <AvatarUpload className="mb-8" currentAvatarUrl={user?.avatar?.fileUrl} />


              {user?.role == UserRole.doctor && <CreateDoctor onLoadingChange={setLoading} />}
              
              <div className="flex gap-2 justify-end">
                <Button color="blue" icon={FiLogIn} label="Iniciar Sesión" type="submit" />
              </div>
          </form>
      </main>
    );
}