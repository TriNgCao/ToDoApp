import React from 'react'

const Footer = ({ completedTasksCount = 2, activeTasksCount = 3 }) => {
    return <>
        {completedTasksCount + activeTasksCount > 0 && (
            <div className="text-center">
                <p className="text-sm text-muted-foreground">
                    {completedTasksCount > 0 && (
                        <>
                            You have completed {completedTasksCount} tasks, {activeTasksCount > 0 && ` just ${activeTasksCount} more to finish`}
                        </>
                    )}

                    {completedTasksCount === 0 && activeTasksCount > 0 && (
                        <>
                            Let's start {activeTasksCount} mission
                        </>
                    )}
                </p>
            </div>
        )}
    </>
}

export default Footer