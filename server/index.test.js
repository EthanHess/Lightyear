const rewire = require("rewire")
const index = rewire("./index")
const checkLoggedIn = index.__get__("checkLoggedIn")
// @ponicode
describe("checkLoggedIn", () => {
    test("0", () => {
        let callFunction = () => {
            checkLoggedIn({ session: { user: "user-name" } }, "bc23a9d531064583ace8f67dad60f6bb", " ")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            checkLoggedIn({ session: { user: 123 } }, "bc23a9d531064583ace8f67dad60f6bb", " ")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            checkLoggedIn({ session: { user: "username" } }, 987650, " ")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            checkLoggedIn({ session: { user: "user_name" } }, 12, " ")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            checkLoggedIn({ session: { user: "username" } }, "a1969970175", " ")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            checkLoggedIn(undefined, NaN, "")
        }
    
        expect(callFunction).not.toThrow()
    })
})
