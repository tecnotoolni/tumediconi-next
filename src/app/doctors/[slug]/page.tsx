import DoctorPublicHandler from "@/lib/public/doctorHandler";

interface PageProps {
    params: { slug: string };
}

export default async function DoctorPage({ params }: PageProps) {
    const { slug } = params;
    const doctor = await DoctorPublicHandler.getBySlug(slug);

    console.log(doctor);

    return (
        <div>
            <h1>Doctor Slug: {slug}</h1>
        </div>
    );
}
