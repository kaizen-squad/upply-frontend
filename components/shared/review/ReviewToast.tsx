import React, { FC } from 'react'

const ReviewToast:FC<{username:string, variant: 'To_Prestataire' | 'To_Client'}> = ({variant, username}) => {

    if(variant === 'To_Client')
        return (
            <div>
                <small>RETOUR D'EXPERIENCE</small>
                <p>Notez le travail effectué par {username} sur votre mission. Cela participe</p>
            </div>
        )
    if(variant === 'To_Prestataire')
        return (
            <div>

            </div>
        )
}

export default ReviewToast