import es from "@/sources/lang.es";
import { ApiResponse } from "@/types/ApiResponse";
import { Doctor } from "@/types/Doctor";

export default class DoctorPublicHandler {

    static async getAll() {
        const response = await fetch("/api/public/doctors", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(es.doctor.error.unknown);
        }

        return await response.json() as ApiResponse<Doctor[]>;
    }

    static async getBySlug(slug: string) {
        const response = await fetch(`${process.env.API_URL}/public/doctors/${slug}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(es.doctor.error.unknown);
        }

        return await response.json() as ApiResponse<Doctor>;
    }

}