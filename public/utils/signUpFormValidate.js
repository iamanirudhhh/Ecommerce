export const validateSignupForm = (user) => {
    const errors = {};

    if (!user.firstName.trim()) {
        errors.firstName = "First name is required";
    }

    if (!user.lastName.trim()) {
        errors.lastName = "Last name is required";
    }

    if (!user.email.trim()) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
        errors.email = "Invalid email address";
    }

    if (!user.mobileNo.trim()) {
        errors.mobileNo = "Mobile number is required";
    } else if (!/^\d{10}$/.test(user.mobileNo)) {
        errors.mobileNo = "Mobile number must be 10 digits";
    }

    if (!user.password.trim()) {
        errors.password = "Password is required";
    }

    return errors;
};

export const validateLoginForm = (user) => {
    const errors = {};

    if (!user.email.trim()) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
        errors.email = "Invalid email address";
    }

    if (!user.password.trim()) {
        errors.password = "Password is required";
    }

    return errors;
};

export const validateEmail = (email) => {
    const errors = {};

    if (!email.trim()) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "Invalid email address";
    }

    return errors;
};

export const validateChangePassword = (user) => {
    const errors = {};

    if (!user.password.trim()) {
        errors.password = "Password is required";
    }

    if (!user.confirmPassword.trim()) {
        errors.confirmPassword = "Confirm Password is required";
    }

    if (user.password !== user.confirmPassword) {
        errors.confirmPassword = "Password didn't matched";
    }

    return errors;
};

export const validateMobileNo = (userProfile) => {
    const errors = {};

    if (!userProfile.mobileNo) {
        errors.mobileNo = "Mobile number is required";
    } else if (!/^\d{10}$/.test(userProfile.mobileNo)) {
        errors.mobileNo = "Mobile number must be 10 digits";
    }

    return errors;
};

export const validateEditProfile = (userProfile) => {
    const errors = {};

    if (!userProfile.firstName.trim()) {
        errors.firstName = "First name is required";
    }

    if (!userProfile.lastName.trim()) {
        errors.lastName = "Last name is required";
    }

    if (!userProfile.email.trim()) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userProfile.email)) {
        errors.email = "Invalid email address";
    }

    if (!userProfile.gender) {
        errors.gender = "Gender is required";
    }


    return errors;
};

export const validateEditPasswordAccount = (userProfile) => {
    const errors = {};

    if (!userProfile.currentPassword) {
        errors.currentPassword = "Current Password is required";
    }

    if (!userProfile.newPassword) {
        errors.newPassword = "New Password is required";
    }

    if (!userProfile.confirmPassword) {
        errors.confirmPassword = "Confirm Password is required";
    }

    if (userProfile.newPassword !== userProfile.confirmPassword) {
        errors.confirmPassword = "Password didn't matched";
    }

    return errors;

};

export const validateAddAddress = (userAddress) => {
    const errors = {};

    if (!userAddress.addressTitle) {
        errors.addressTitle = "Address title is required";
    }

    if (!userAddress.firstName) {
        errors.firstName = "First name is required";
    }

    if (!userAddress.lastName) {
        errors.lastName = "Last name is required";
    }

    if (!userAddress.addressLine) {
        errors.addressLine = "Address line is required";
    }

    if (!userAddress.city) {
        errors.city = "City is required";
    }

    if (!userAddress.pincode) {
        errors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(userAddress.pincode)) {
        errors.pincode = "Pincode must be a 6-digit number";
    }

    if (!userAddress.state) {
        errors.state = "State is required";
    }

    if (!userAddress.mobileNo) {
        errors.mobileNo = "Mobile number is required";
    } else if (!/^\d{10}$/.test(userAddress.mobileNo)) {
        errors.mobileNo = "Mobile number must be a 10-digit number";
    }

    return errors;

};

export const validateProductForm = (products) => {
    const errors = {};

    if (!products.productName) {
        errors.productName = "Product name is required";
    }

    if (!products.price) {
        errors.price = "Price is required";
    }

    if (!products.category) {
        errors.category = "Category is required";
    }

    if (!products.status) {
        errors.status = "Status is required";
    }

    return errors;
};
