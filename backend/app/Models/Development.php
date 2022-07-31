<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

const TECHNOLOGIES = ['Java', 'PHP', 'C#', 'C++', 'Python', 'JavaScript', 'C', 'GO', 'HTML', 'CSS'];
const DEVELOPMENTS = ['App', 'Ecommerce', 'Landing Page', 'Pc Game', 'Mobile Game', 'Robotic', 'Algorithms', '3D View', 'Artificial Intelligence'];

class Development extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'technology',
        'hackathon_id'
    ];

    public function hackathon()
    {
        return $this->belongsTo(Hackathon::class);
    }

    public function developer()
    {
        return $this->hasOne(Developer::class);
    }

    public function createDevelopmentCron($hackathonId)
    {
        return Development::create([
            'name' => DEVELOPMENTS[rand(0, 8)],
            'technology' => TECHNOLOGIES[rand(0, 9)],
            'hackathon_id' => $hackathonId
        ]);
    }
}
