import React from "react"

const PetForm = ()=> {
    return (
        <div className="flex justify-center items-center w-full h-full">
          <form
            noValidate
            onSubmit={onHandelSubmit}
            style={formStyle}
            className="w-full max-w-lg bg-white shadow-md px-8 pt-6 pb-8 mb-4"
          >
            <div className="flex justify-center mt-1 mb-8">
              <p style={alertStyle} className="text-lg italic">
                Danos toda la información posible!
              </p>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-1 ml-3"
                  htmlFor="name"
                >
                  Nombre
                </label>
                <input
                  maxLength="15"
                  onChange={onHandleChange}
                  noValidate
                  value={form.name}
                  style={inputStyle}
                  className="appearance-none block w-full bg-white text-gray-700 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="name"
                  type="text"
                ></input>
    
                {form.formErrors.name.length > 0 ? "No puede estar vacio" : ""}
              </div>
    
              <div className="w-full md:w-1/2 mb-6 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-1 ml-3"
                  htmlFor="type"
                >
                  Tipo
                </label>
                <div className="relative">
                  <select
                    onChange={onHandleChange}
                    noValidate
                    style={inputStyle}
                    className="block appearance-none w-full bg-white text-gray-700 py-3 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="type"
                  >
                    <option>Perro</option>
                    <option>Gato</option>
                    <option>Otro</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
    
              <div className="w-full md:w-1/2 mb-6 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-1 ml-3"
                  htmlFor="breed"
                >
                  Raza
                </label>
                <input
                  maxLength="15"
                  onChange={onHandleChange}
                  noValidate
                  style={inputStyle}
                  className="appearance-none  block w-full bg-white text-gray-700 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="breed"
                  type="text"
                ></input>
                {form.formErrors.breed.length > 0 ? "No puede estar vacio" : ""}
              </div>
    
              <div className="w-full md:w-1/2 mb-6 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-1 ml-3"
                  htmlFor="sex"
                >
                  Sexo
                </label>
                <div className="relative">
                  <select
                    onChange={onHandleChange}
                    noValidate
                    style={inputStyle}
                    className="block appearance-none w-full bg-white text-gray-700 py-3 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="sex"
                  >
                    <option>Macho</option>
                    <option>Hembra</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
    
              <div className="w-full md:w-1/2 mb-6 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-1 ml-3"
                  htmlFor="age"
                >
                  Edad
                </label>
                <input
                  onChange={onHandleChange}
                  noValidate
                  style={inputStyle}
                  className="appearance-none block w-full bg-white text-gray-700 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="age"
                  type="number"
                ></input>
                {form.formErrors.age.length > 0 ? "No puede estar vacio" : ""}
              </div>
    
              <div className="w-full md:w-1/2 mb-6 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-1 ml-3"
                  htmlFor="description"
                >
                  Descripción general
                </label>
                <input
                  maxLength="30"
                  onChange={onHandleChange}
                  noValidate
                  style={inputStyle}
                  className="appearance-none block w-full bg-white text-gray-700 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="description"
                  type="text"
                ></input>
                {form.formErrors.description.length > 0
                  ? "No puede estar vacio"
                  : ""}
              </div>
    
              <div className="w-full md:w-1/2 mb-6 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-1 ml-3"
                  htmlFor="img"
                >
                  Foto
                </label>
                <input
                  onChange={onHandleChange}
                  name="img"
                  noValidate
                  className="appearance-none block w-full bg-white text-gray-700 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="file"
                  accept="image/*"
                ></input>
                {form.formErrors.img.length > 0 ? "Debe cargar una foto" : ""}
              </div>
            </div>
    
            <div className="flex justify-center lg:justify-end">
              <button
                style={buttonStyle}
                className="w-full hover:bg-blue-700 text-white font-medium py-3 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Bienvenido
              </button>
            </div>
          </form>
        </div>
      );

}
export default PetForm
