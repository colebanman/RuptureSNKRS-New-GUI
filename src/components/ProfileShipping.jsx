export default function ProfileShipping() {
    return(
        <div>
             <label className="label">
                <span  className="label-text">Profile Nickname</span>
            </label>
            <input id="profileName" type="text" placeholder="Profile Name" className="input input-sm input-bordered w-full max-w-xs" />

            <label className="label">
                <span className="label-text">Full Name</span>
            </label>
            <input id="fullName" type="text" placeholder="Full Name" className="input input-sm input-bordered w-full max-w-xs" />

            <label className="label">
                <span className="label-text">Email</span>
            </label>
            <input id="email" type="text" placeholder="Email" className="input input-sm input-bordered w-full max-w-xs" />

            <label className="label">
                <span className="label-text">Phone</span>
            </label>
            <input id="phone" type="text" placeholder="Phone" className="input input-sm input-bordered w-full max-w-xs" />

            <label className="label">
                <span className="label-text">Address Line 1</span>
            </label>
            <input id="addressLine1" type="text" placeholder="Address Line 1" className="input input-sm input-bordered w-full max-w-xs" />

            <label className="label">
                <span className="label-text">Address Line 2</span>
            </label>
            <input id="addressLine2" type="text" placeholder="Address Line 2" className="input input-sm input-bordered w-full max-w-xs" />

            <label className="label">
                <span className="label-text">State</span>
            </label>
            <input id="state" type="text" placeholder="State" className="input input-sm input-bordered w-full max-w-xs" />

            <label className="label">
                <span className="label-text">City</span>
            </label>
            <input id="city" type="text" placeholder="City" className="input input-sm input-bordered w-full max-w-xs" />

            <label className="label">
                <span className="label-text">Zip Code</span>
            </label>
            <input id="zip" type="text" placeholder="Zip Code" className="input input-sm input-bordered w-full max-w-xs" />
            
        </div>
    )
}