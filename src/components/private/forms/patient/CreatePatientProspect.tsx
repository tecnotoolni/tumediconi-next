import VisualSelect from "@/components/common/ui/VisualSelect";
import GeolocationSelects from "../GeolocationSelects";
import TextAreaInput from "@/components/common/ui/TextAreaInput";
import TextInput from "@/components/common/ui/TextInput";
import { KeyWithStringValue } from "@/types/KeyWithStringValue";
import { useEffect, useState } from "react";
import { genderOptions } from "@/sources/options";

interface Props {
  onLoadingChange?: (isLoading: boolean) => void;
  errors?: KeyWithStringValue;
}

export default function CreatePatientProspect({ onLoadingChange, errors }: Props) {

    const [fieldsError, setFieldsError] = useState<KeyWithStringValue>({});
    const [data, setData] = useState<{ [key: string]: string }>({});

    const setDynamicData = (field: string, value: string) => {
      setData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    };
    
    useEffect(() => {
      if (errors) {
        setFieldsError(errors);
      }
    }, [errors]);


    useEffect(() => {
      console.log("Data changed:", data);
    }, [data, onLoadingChange]);
    
  return (
    <section className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
          <TextInput
              required
              error={fieldsError?.firstName}
              label="Nombres"
              name="firstName"
          />
          <TextInput
              required
              error={fieldsError?.lastName}
              label="Apellidos"
              name="lastName"
          />
      </div>
      <div className="grid grid-cols-2 gap-4">
          <TextInput
              required
              error={fieldsError?.firstName}
              label="Cédula de Identidad"
              name="identityCard"
          />
          <TextInput
              error={fieldsError?.activeSince}
              type="date"
              label="Fecha de Nacimiento"
              name="birthDate"
          />
      </div>
      <GeolocationSelects
          data={data}
          fieldError={fieldsError}
          setDynamicData={setDynamicData}
          onLoadingChange={onLoadingChange}
      />
      <VisualSelect inline name="gender" options={genderOptions} />
      <TextAreaInput error={fieldsError?.aproximateAddress} label="Dirección Aproximada" name="aproximateAddress" />
    </section>
  )
}