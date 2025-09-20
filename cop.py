import random

user_score = 0
computer_score = 0
tie_score = 0

choices = ["Rock", "Paper", "Scissors"]


import random
import tkinter as tk

user_score = 0
computer_score = 0
tie_score = 0

choices = ["Rock", "Paper", "Scissors"]

def play(user_choice):
    global user_score, computer_score, tie_score, score_label, result_label
    computer_choice = random.choice(choices)
    if user_choice == computer_choice:
        result = "It's a tie!"
        tie_score += 1
    elif (user_choice == "Rock" and computer_choice == "Scissors") or \
         (user_choice == "Paper" and computer_choice == "Rock") or \
         (user_choice == "Scissors" and computer_choice == "Paper"):
        result = "You win!"
        user_score += 1
    else:
        result = "Computer wins!"
        computer_score += 1
    result_label.config(
        text=f"🧑 You chose: {user_choice}\n🤖 Computer chose: {computer_choice}\n\n{result}"
    )
    score_label.config(
        text=f"Scores:\nYou: {user_score}  Computer: {computer_score}  Ties: {tie_score}"
    )

if __name__ == "__main__":
    root = tk.Tk()
    root.title("Rock Paper Scissors")
    root.geometry("350x250")
    root.resizable(False, False)
    root.configure(bg="#f0f4fc")

    title_label = tk.Label(
        root, text="Rock Paper Scissors", font=("Arial", 16, "bold"), bg="#f0f4fc"
    )
    title_label.pack(pady=10)

    tk.Label(
        root, text="Choose your move:", font=("Arial", 12), bg="#f0f4fc"
    ).pack()

    button_frame = tk.Frame(root, bg="#f0f4fc")
    button_frame.pack(pady=10)

    btn_styles = {"font": ("Arial", 12), "width": 10, "height": 2, "bg": "#dbeafe"}

    for choice, emoji in zip(["Rock", "Paper", "Scissors"], ["🪨", "📄", "✂️"]):
        tk.Button(
            button_frame,
            text=f"{emoji}\n{choice}",
            command=lambda c=choice: play(c),
            **btn_styles
        ).pack(side=tk.LEFT, padx=8)

    result_label = tk.Label(
        root, text="", font=("Arial", 12), bg="#f0f4fc", justify="left"
    )
    result_label.pack(pady=15)

    score_label = tk.Label(
        root, text="Scores:\nYou: 0  Computer: 0  Ties: 0", font=("Arial", 12, "bold"), bg="#f0f4fc"
    )
    score_label.pack(pady=5)

    quit_button = tk.Button(
        root, text="Quit", font=("Arial", 11), width=10, bg="#fca5a5", command=root.quit
    )
    quit_button.pack(pady=5)

    root.mainloop()