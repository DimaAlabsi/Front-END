import React, { useState ,useEffect} from "react";
import Input from "./Input";
import DatePickerComponent from "./DatePicker";
import { errorAlert, successAlert } from "../../utils/alerts";
import Image from "next/image";
import taskImg from "../../public/task_bg.jpg";

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    startDate: new Date(),
    dueDate: null,
    duration: 0,
    timeSpent: 0,
    assignedTo: "",
  });

  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const validateDateRange = (startDate, dueDate) => {
    const oneDay = 24 * 60 * 60 * 1000;

    if (startDate > dueDate) {
      return "Due Date cannot be earlier than Start Date";
    }

    const dateDifference = Math.round((dueDate - startDate) / oneDay);

    if (dateDifference < 1 || dateDifference > 6) {
      return "Start Date and Due Date must have a range of 1 to 6 days (inclusive).";
    }

    return null;
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }
    if (formData.description.length > 150) {
      newErrors.description = "Description must be up to 150 characters.";
    }

    if (!formData.startDate || !formData.dueDate) {
      newErrors.dates = "Start Date and Due Date are required";
    } else {
      const startDate = new Date(formData.startDate);
      const dueDate = new Date(formData.dueDate);

      const dateRangeError = validateDateRange(startDate, dueDate);

      if (dateRangeError) {
        newErrors.dates = dateRangeError;
      }
    }

    if (formData.duration <= 0 || formData.duration > 30) {
      newErrors.duration =
        "Duration must be greater than 0 and not exceed 30 hours";
    }

    if (formData.timeSpent <= 0) {
      newErrors.timeSpent = "Time Spent must be greater than 0";
    }
    if (!formData.assignedTo) {
      newErrors.assignedTo = "Please select a user.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      successAlert("Form submitted successfully!");
      console.log("Form submitted:", formData);
      setSubmitted(true);
    } else {
      errorAlert("Form validation failed!");
      console.log("Form validation failed");
    }
  };
  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      startDate: null,
      dueDate: null,
      duration: 0,
      timeSpent: 0,
      assignedTo: "",
    });

    setErrors({});
    setSubmitted(false);
  };
  const renderSummaryItem = (label, value) => (
    <p className="mb-2" key={label}>
      <span className="font-bold">{label}:</span> {value}
    </p>
  );
  return (
    <div className="rounded-[1vh] p-5 border-[0.4vh] border-[#1C1A3C] w-full  grid grid-cols-1 mds:grid-cols-2 gap-6 justify-start items-start max-h-[90vh] overflow-y-auto">
      <div className=" ">
        <Image
          className="rounded-[1vh]"
          height={"650"}
          width={"500"}
          src={taskImg}
          alt="task image"
        />
      </div>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <p className="label mb-3">Please fill with your Task details</p>
          <div className="  grid grid-cols-2 gap-[2vh]">
            <Input
              placeholder="Enter Title"
              type="text"
              name="title"
              onChange={(e) => handleInputChange("title", e.target.value)}
              required
              validationError={errors.title}
            />

            <Input
              placeholder="Enter Subtitle"
              type="text"
              name="subtitle"
              onChange={(e) => handleInputChange("subtitle", e.target.value)}
            />
          </div>
          <Input
            placeholder="Enter Description"
            type="text"
            name="description"
            onChange={(e) => handleInputChange("description", e.target.value)}
            isTextarea
            required
            validationError={errors.description}
          />

          <div className=" flex flex-wrap gap-x-[1vh]">
            <DatePickerComponent
              title={"Start Date"}
              showIcon
              inline
              showDisabledMonthNavigation
              selected={formData.startDate}
              onChange={(date) => handleInputChange("startDate", date)}
            />

            <DatePickerComponent
              title={"Due Date"}
              showIcon
              inline
              showDisabledMonthNavigation
              selected={formData.dueDate}
              onChange={(date) => handleInputChange("dueDate", date)}
            />
            {errors.dates && <p className="error-message"> * {errors.dates}</p>}
          </div>

          <Input
            placeholder="Enter Duration in Hours"
            type="number"
            name="duration"
            min={0}
            onChange={(e) => handleInputChange("duration", e.target.value)}
            required
            validationError={errors.duration}
          />

          <Input
            placeholder="Enter Time Spent"
            type="number"
            name="timeSpent"
            min={0}
            onChange={(e) => handleInputChange("timeSpent", e.target.value)}
            required
            validationError={errors.timeSpent}
          />
          <div className="">
            <label className="label block">Assigned To</label>
            <select
              required
              className={`bg-[#1C1A3C] text-[#ffffff] p-1 w-full h-[4vh] rounded-[5px] ${
                errors.assignedTo ? "border-red-500" : ""
              }`}
              value={formData.assignedTo}
              onChange={(e) => handleInputChange("assignedTo", e.target.value)}
            >
              <option selected>Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
            {errors.assignedTo && (
              <div className="error-message">{errors.assignedTo}</div>
            )}
          </div>
          <button
            type="submit"
            className="bg-[#216ba5]  hover:bg-[#054779] text-white font-bold py-2 px-4 rounded my-[2vh]"
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="bg-gray-200 p-4 rounded-md shadow-md ">
          <h2 className="text-2xl font-bold mb-4">Task Summary</h2>
          {renderSummaryItem("Title", formData.title)}
          {renderSummaryItem("Subtitle", formData.subtitle)}
          {renderSummaryItem("Description", formData.description)}
          {renderSummaryItem("Start Date", formData.startDate?.toString())}
          {renderSummaryItem("Due Date", formData.dueDate?.toString())}
          {renderSummaryItem("Duration", `${formData.duration} hours`)}
          {renderSummaryItem("Time Spent", `${formData.timeSpent} hours`)}
          {renderSummaryItem("Assigned To", formData.assignedTo)}

          <button
            className="bg-[#216ba5]  hover:bg-[#054779] text-white font-bold py-2 px-4 rounded my-[2vh]"
            onClick={resetForm}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskForm;
