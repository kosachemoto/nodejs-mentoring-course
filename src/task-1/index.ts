export = () => {
    process.stdin.on("data", (data) => {
        const result = data.reverse().toString().trim() + "\n\n";
    
        process.stdout.write(result);
    });
};