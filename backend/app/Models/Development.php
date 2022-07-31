<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

const TECHNOLOGIES = ['Java', 'PHP', 'C#', 'C++', 'Python', 'JavaScript', 'C', 'GO', 'HTML', 'CSS'];
const DEVELOPMENTS = ['mobile App', 'ecommerce', 'landing', 'Pc Game', 'mobile Game', 'robotic', 'algorithms', '3D view', 'artificial intelligence', 'others'];

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
        return $this->belongsTo(Developer::class);
    }

    public function createDevelopmentCron($index, $hackathonId)
    {
        return Development::create([
            'name' => DEVELOPMENTS[$index],
            'technology' => TECHNOLOGIES[$index],
            'hackathon_id' => $hackathonId
        ]);
    }
}
