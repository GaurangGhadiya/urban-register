'use client';
import React, { useEffect, useState } from 'react'
import AddMemberModal from './AddMemberModal'
import FamilyDetails from './FamilyDetails'
import NewFamily from './NewFamily'
import AddHOF from './AddHOF'
import { useSelector } from 'react-redux';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

// export async function getStaticProps({ locale }) {
//     return {
//         props: { ...await serverSideTranslations(locale, ['translation']) }
//     }
// }


const AddParivar = ({state, setState}) => {
    const [formData, setFormData] = useState({
        municipal: "",
        district: "",
        ward: "",
          makan: "",
          condition: "",
          bpl: "",
          class: "",
          subclass: "",
          rationCard: "",
          mobile: "",
          dastavage:""
      })

    return (
        <>
            {state == "1" ?
                <NewFamily setState={setState} formData={formData} setFormData={setFormData}/>
                : state == "2" ?

                    <AddHOF setState={setState}  familyDetails={formData} setFamilyDetails={setFormData}/>
                    :
                    <FamilyDetails />
            }

            {/* <AddMemberModal handleCloseModal={handleClose} openModal={open} /> */}
        </>
    )
}

export default AddParivar
