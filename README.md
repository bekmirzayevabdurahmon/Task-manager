# Task Manager

Task Manager - bu foydalanuvchilarga kundalik vazifalarini belgilashda yordam beruvchi va samaradorlikni oshirish uchun yordam beruvchi application

## Funksional talablar

- Har bir foydalanuvchi login va sign in qila olishi
- Foydalanuvchilar yangi folderlar yarata olishi
- Vazifalarni qo'shish, tahrirlash va o'chirish
- Har bir foydalanuvchi o'z tasklarini o'zi ko'radi
- Vazifa xolatini yangilashi (in proccess, completed)
- Foydalanuvchi logout qila olishi

## Nofunksional talabar

- Loyiha tezkorligi
- Loyihaning xavfsiz bo'lishi
- Loyiha responsiv bo'lishi
- Loyiha hech qanday kamchiliksiz ishlashi

## Databaza modellar

1. Users
   - id
   - name
   - folders[]
   - created_at
2. Folders
   - id
   - user_id
   - name
   - tasks[]
3. Tasks
   - id
   - name
   - user_id
   - description
   - project_id
   - priority
   - deadline
