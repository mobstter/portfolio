import tkinter as tk
from tkinter import ttk
import math
import re

class Calculator(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("High-End Calculator")
        self.geometry("400x600")
        self.configure(bg="#222831")
        self.resizable(False, False)
        self.expression = ""
        self.create_widgets()

    def create_widgets(self):
        style = ttk.Style(self)
        style.theme_use('clam')
        style.configure('TButton', font=('Segoe UI', 16), padding=10, background="#393E46", foreground="#EEEEEE")
        style.map('TButton', background=[('active', '#00ADB5')])

        self.display = tk.Entry(self, font=('Segoe UI', 28), borderwidth=0, relief='flat', justify='right', bg="#393E46", fg="#00FFDD")
        self.display.pack(fill='x', padx=20, pady=30)

        btns_frame = tk.Frame(self, bg="#222831")
        btns_frame.pack(expand=True, fill='both')

        buttons = [
            ['C', '√', '^', '/'],
            ['7', '8', '9', '*'],
            ['4', '5', '6', '-'],
            ['1', '2', '3', '+'],
            ['0', '.', '(', ')'],
            ['sin', 'cos', 'tan', '=']
        ]

        for r, row in enumerate(buttons):
            for c, char in enumerate(row):
                btn = ttk.Button(btns_frame, text=char, command=lambda ch=char: self.on_button_click(ch))
                btn.grid(row=r, column=c, sticky='nsew', padx=4, pady=4)

        for i in range(4):
            btns_frame.columnconfigure(i, weight=1)
        for i in range(len(buttons)):
            btns_frame.rowconfigure(i, weight=1)

    def preprocess_expression(self, expr):
        # Remove leading zeros from numbers (but keep '0.' for decimals)
        def repl(match):
            num = match.group(0)
            if '.' in num:
                return num.lstrip('0') or '0'
            return str(int(num))
        return re.sub(r'\b0+(\d+)', repl, expr)

    def on_button_click(self, char):
        if char == 'C':
            self.expression = ""
            self.display.delete(0, tk.END)
        elif char == '=':
            try:
                expr = self.preprocess_expression(self.expression)
                result = self.safe_eval(expr)
                self.display.delete(0, tk.END)
                self.display.insert(tk.END, str(result))
                self.expression = str(result)
            except Exception:
                self.display.delete(0, tk.END)
                self.display.insert(tk.END, "Error")
                self.expression = ""
        elif char == '√':
            self.expression += "math.sqrt("
            self.display.insert(tk.END, "√(")
        elif char in ['sin', 'cos', 'tan']:
            self.expression += f"math.{char}("
            self.display.insert(tk.END, f"{char}(")
        elif char == '^':
            self.expression += "**"
            self.display.insert(tk.END, "^")
        else:
            self.expression += char
            self.display.insert(tk.END, char)

    def safe_eval(self, expr):
        # Only allow safe functions and math
        allowed_names = {k: v for k, v in math.__dict__.items() if not k.startswith("_")}
        allowed_names['abs'] = abs
        return eval(expr, {"__builtins__": None}, allowed_names)

if __name__ == "__main__":
    app = Calculator()
    app.mainloop()