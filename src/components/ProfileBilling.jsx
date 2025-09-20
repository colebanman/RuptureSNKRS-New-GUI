export default function ProfileBilling() {
    return(
        <div>
             <label className="label">
                <span className="label-text">Card Holder</span>
            </label>
            <input id="cardHolder" type="text" placeholder="Card Holder" className="input input-sm input-bordered w-full max-w-xs" />

            <label className="label">
                <span className="label-text">Card Number</span>
            </label>
            <input id="cardNumber" type="text" placeholder="Card Number" className="input input-sm input-bordered w-full max-w-xs" />

            <label className="label">
                <span className="label-text">Card CVV</span>
            </label>
            <input id="cardCvv" type="text" placeholder="Card CVV" className="input input-sm input-bordered w-full max-w-xs" />

            <label className="label">
                <span className="label-text">Card Expiration</span>
            </label>
            <input id="cardExpiration" type="month" className="input input-sm input-bordered w-full max-w-xs" />
        </div>
    )
}