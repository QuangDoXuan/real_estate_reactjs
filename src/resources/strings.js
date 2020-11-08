module.exports = {
    key: {
        storage: {
            current_account: "CURRENT_USER"

        }
    },
    action: {
        action_user_login: "ACTION_USER_LOGIN",
        action_user_logout: "ACTION_USER_LOGOUT",
    },
    message: {
        user: {
            create_error: "Tạo mới tài khoản không thành công!",
            update_error: "Cập nhật tài khoản không thành công!",
            error_code_2: "SĐT đã được sử dụng trong hệ thống. Vui lòng sử dụng SĐT khác!",
            error_code_3: "Email đã được sử dụng trong hệ thống. Vui lòng sử dụng Email khác!",
            error_code_4: "Số văn bằng chuyên môn đã tồn tại trên hệ thống. Vui lòng sử dụng Số văn bằng chuyên môn khác!",
            error_code_5: "Username đã tồn tại trên hệ thống. Vui lòng sử dụng Username khác!",
        }, post: {
            approved_success: "Duyệt câu hỏi  thành công!",
            approved_error: "Duyệt câu hỏi không thành công!",
        },
        hospital: {
            create_error: "Tạo mới tài khoản không thành công!",
            update_error: "Cập nhật tài khoản không thành công!",

        }
    },
    api: {
        user: {
            login: "/auth/login",   
            register: "/api/Account/Register",
            getAll:"/api/User/all"
        }, 
        news:{
            getAll: "/api/News/all",
            getNewById:"/api/News/get",
            getNewPage: "api/News",
            create:"/api/News/create",
            delete:"/api/News/delete",
            getByPage:"/api/News/page",
        },
        new_category:{
            getAll:"/api/NewCategory/all",
            getById:"/api/NewCategories/get",
            create:"/api/News/create",
            getByPage:"/api/NewCategory/page",
            delete:"/api/NewCategory/delete"
        },
        product_category:{
            getAll:"/api/ProductCategories/all",
            getById:"/api/ProductCategories",
            create:"/api/ProductCategories/create",
            getByPage:"/api/ProductCategories/page",
            delete:"/api/ProductCategories/delete",
            searchByName:'/api/ProductCategories',
            getByParent:'/api/ProductCategories/getByParent'
        },
        project: {
            all: "/projects"
        },
        product: {
            all: "/products"
        }

    }
} 