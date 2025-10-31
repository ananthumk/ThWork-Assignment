import Task from "../models/TaskModels.js";

const addTask = async (req, res) => {
    try {
        const { title, description, status, priority, dueDate } = req.body

        if (!title || !description || !status || !priority || !dueDate) {
            return res.status(401).json({ message: 'All fields are required' })
        }

        if (status !== 'Open' && status !== 'In Progress' && status !== 'Done') {
            return res.status(401).json({ message: "Invalid value for status. It should be Open, In Progress and Done" })
        }

        if (priority !== 'Low' && priority !== 'Medium' && priority !== 'High') {
            return res.status(401).json({ message: 'Invalid value for priority. It should be Low, Medium and High' })
        }

        const task = new Task({
            user: req.user.userId,
            title: title,
            description: description,
            status: status,
            priority: priority,
            dueDate: dueDate
        })

        await task.save()
        return res.status(200).json({ message: 'Created Task Successfully', task })
    } catch (error) {
        console.log('error at add task: ', error.message)
        return res.status(500).json({ message: 'Internal Server Error', error: error.message })
    }
}

const getTask = async (req, res) => {
    try {
        const { status, priority } = req.query

        const filter = { user: req.user.userId }
        if (status) filter.status = status
        if (priority) filter.priority = priority


        const task = await Task.find(
            filter
        )

        return res.status(200).json({ task })
    } catch (error) {
        console.log('Get Tasks:', error.message)
        return res.status(500).json({ message: 'Internal Server Error', error: error.message })
    }
}

const getTaskById = async (req, res) => {
    try {
        

        const {id} = req.params


        const task = await Task.find({
            _id: id}
        )

        return res.status(200).json({ task })
    } catch (error) {
        console.log('Get Tasks:', error.message)
        return res.status(500).json({ message: 'Internal Server Error', error: error.message })
    }
}

const updateTask = async (req, res) => {
    try {
        const { status, priority } = req.body
        const { id } = req.params

        const updatedata = {}
        if (status) updatedata.status = status
        if (priority) updatedata.priority = priority

        const updatedTask = await Task.findByIdAndUpdate(
            {_id: id, user: req.user.userId}, updatedata, { new: true }
        )

        if (!updatedTask) {
            return res.status(400).json({ message: 'Task not found' })
        }
        return res.status(200).json({ message: 'Updated Successfully', task: updatedTask })
    } catch (error) {
        console.log('Error at update task: ', error.message)
        return res.status(500).json({ message: 'Internal Server Error', error: error.message })
    }
}

const getSummary = async (req, res) => {
    try {
        const tasks = await Task.find({user: req.user.userId})
        const totalTasks = tasks.length

        const openTaskList = tasks.filter(task => task.status === 'Open')
        const openTasks = openTaskList.length

        console.log('get summary',openTaskList)

        let taskByPriority = {
            High: 0, Medium: 0, Low: 0
        }
        openTaskList.forEach(task => {
            if (task.priority in taskByPriority) {
                
                taskByPriority[task.priority] += 1
            }
        });

        const now = new Date()
        const threeDaysLater = new Date(now)
        threeDaysLater.setDate(now.getDate() + 3)

        const dueSoonCount = openTaskList.filter(task => {
            const dueDate = new Date(task.dueDate)
            return dueDate >= now && dueDate <= threeDaysLater
        }).length

        const dueDateCount = {}
        tasks.forEach(task => {
            const dueDay = task.dueDate.toISOString().slice(0, 10)
            dueDateCount[dueDay] = (dueDateCount[dueDay] || 0) + 1
        })

        let busiestDay = null
        let maxCount = 0
        for (const day in dueDateCount) {
            if (dueDateCount[day] > maxCount) {
                maxCount = dueDateCount[day]
                busiestDay = day
            }
        }

        let dominantPriority = "None"
        let maxPriorityCount = 0
        for (const [priority, count] of Object.entries(taskByPriority)) {
            if (count > maxPriorityCount) {
                maxPriorityCount = count
                dominantPriority = priority
            }
        }

        const summary = `You have ${openTasks} open tasks. Most are ${dominantPriority} priority and ${dueSoonCount} are due soon`
        return res.status(200).json({
            totalTasks,
            openTasks,
            taskByPriority,
            dueSoonCount,
            busiestDay,
            summary
        })
    } catch (error) {
        console.log('Error at get summary: ', error.message)
        return res.status(500).json({ message: 'Internal Server Error', error: error.message })
    }
}

export { addTask, getTask, getTaskById, updateTask, getSummary }